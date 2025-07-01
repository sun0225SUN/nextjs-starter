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
import { cn } from '~/lib/utils'

const registerSchema = z.object({
  name: z.string().min(2, 'usernameRequired').max(50, 'usernameRequired'),
  email: z.string().email('emailInvalid'),
  password: z
    .string()
    .min(8, 'passwordRequirements.length')
    .regex(/[A-Z]/, 'passwordRequirements.uppercase')
    .regex(/[a-z]/, 'passwordRequirements.lowercase')
    .regex(/[0-9]/, 'passwordRequirements.number'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()
  const t = useTranslations('Auth')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      const { data: signUpData, error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (error) {
        setError('root', {
          message: error.message || t('registerError'),
        })
        return
      }

      if (signUpData) {
        // 注册成功后自动登录
        const { error: signInError } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        })

        if (!signInError) {
          router.push('/')
          router.refresh()
        } else {
          setError('root', {
            message: t('autoLoginFailed'),
          })
        }
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
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card className='border-none shadow-lg'>
        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              <div className='grid gap-2'>
                <Label
                  htmlFor='name'
                  className='font-medium text-sm'
                >
                  {t('username')}
                </Label>
                <Input
                  id='name'
                  type='text'
                  placeholder={t('usernamePlaceholder')}
                  {...register('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  className='h-10'
                />
                {errors.name && (
                  <p className='text-destructive text-sm'>
                    {t(errors.name.message!)}
                  </p>
                )}
              </div>

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

              {errors.root && (
                <p className='text-destructive text-sm'>
                  {errors.root.message}
                </p>
              )}

              <Button
                type='submit'
                className='mt-10 h-10 w-full'
                disabled={isLoading}
              >
                {isLoading ? t('registerLoading') : t('register')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
