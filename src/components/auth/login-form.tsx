'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { authClient } from '~/lib/auth-client'

const loginSchema = z.object({
  email: z.string().email('emailInvalid'),
  password: z.string().min(1, 'passwordRequired'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations('Auth')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      const { data: signInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        setError('root', {
          message: t('loginError'),
        })
        return
      }

      if (signInData) {
        router.push('/')
        router.refresh()
      }
    } catch (_err) {
      setError('root', {
        message: t('networkError'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='border-none px-10 py-10! shadow-lg'>
      <CardContent className='px-0!'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <div className='grid gap-2'>
              <Label
                htmlFor='email'
                className='font-medium text-sm'
              >
                {t('email')}
              </Label>
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                className='h-10'
              />
              {errors.email && (
                <p className='text-destructive text-sm'>
                  {t(errors.email.message!)}
                </p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label
                htmlFor='password'
                className='font-medium text-sm'
              >
                {t('password')}
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder')}
                  {...register('password')}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className='h-10 pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer text-muted-foreground hover:text-foreground'
                  aria-label={t('togglePassword')}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-destructive text-sm'>
                  {t(errors.password.message!)}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className='my-2 text-destructive text-sm'>
              {errors.root.message}
            </p>
          )}

          <Button
            type='submit'
            className='mt-10 h-10 w-full cursor-pointer'
            disabled={isLoading}
          >
            {isLoading ? t('loginLoading') : t('login')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
