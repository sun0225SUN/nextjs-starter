import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { RegisterForm } from '~/components/auth/register-form'

export default async function RegisterPage() {
  const t = await getTranslations('Auth')

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-[400px] space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='font-bold text-2xl tracking-tight'>{t('register')}</h1>
          <p className='text-muted-foreground text-sm'>
            {t('registerDescription')}
          </p>
        </div>

        <RegisterForm />

        <p className='text-center text-muted-foreground text-sm'>
          {t('alreadyHaveAccount')}{' '}
          <Link
            href='/login'
            className='font-medium text-primary hover:underline'
          >
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
