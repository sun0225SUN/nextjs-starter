import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LoginForm } from '~/components/auth/login-form'

export default async function LoginPage() {
  const t = await getTranslations('Auth')

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-[400px] space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='font-bold text-2xl tracking-tight'>{t('login')}</h1>
          <p className='text-muted-foreground text-sm'>
            {t('loginDescription')}
          </p>
        </div>

        <LoginForm />

        <p className='text-center text-muted-foreground text-sm'>
          {t('dontHaveAccount')}{' '}
          <Link
            href='/register'
            className='font-medium text-primary hover:underline'
          >
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  )
}
