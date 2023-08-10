import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  try {
    const { limit, page, authorName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        authorName: z.string().nullish().optional(),
      })
      .parse({
        authorName: url.searchParams.get('authorName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    let whereClause = {}

    if (authorName) {
      whereClause = {
        user: {
          name: authorName,
        },
      }
    } else if (session) {
      whereClause = {
        user: {
          id: {
            in: session.user.id,
          },
        },
      }
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}