import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Se requiere inicio de sesión..',
      description: 'Debe iniciar sesión para hacer eso.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/sign-in'
          className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}
