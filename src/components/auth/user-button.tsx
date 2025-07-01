'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '~/components/ui/button'
import { authClient } from '~/lib/auth-client'

interface UserButtonProps {
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

export function UserButton({ user }: UserButtonProps) {
  const router = useRouter()
  const t = useTranslations('Auth')

  const handleSignOut = async () => {
    await authClient.signOut()
    router.refresh()
  }

  if (!user) {
    return (
      <Button
        variant='outline'
        asChild
      >
        <Link href='/login'>{t('login')}</Link>
      </Button>
    )
  }

  return (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col'>
        {user.name && <p className='font-medium text-sm'>{user.name}</p>}
        {user.email && (
          <p className='text-muted-foreground text-xs'>{user.email}</p>
        )}
      </div>

      <Button
        variant='ghost'
        className='cursor-pointer'
        size='icon'
        onClick={handleSignOut}
      >
        <LogOut className='h-4 w-4' />
        <span className='sr-only'>{t('logout')}</span>
      </Button>
    </div>
  )
}
