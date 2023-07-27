export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get("url");

  if (!href) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(href);

    if (!res.ok) {
      return new Response("Failed to fetch data", { status: 500 });
    }

    const data = await res.text();

    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "";

    const descriptionMatch = data.match(
      /<meta name="description" content="(.*?)">/
    );
    const description = descriptionMatch ? descriptionMatch[1] : "";

    const imageMatch = data.match(/<meta property="og:image" content="(.*?)">/);
    const imageUrl = imageMatch ? imageMatch[1] : "";

    return new Response(
      JSON.stringify({
        success: 1,
        meta: {
          title,
          description,
          image: {
            url: imageUrl,
          },
        },
      })
    );
  } catch (error) {
    return new Response("Error occurred during fetch", { status: 500 });
  }
}
