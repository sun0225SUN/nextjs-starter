import { getTranslations } from 'next-intl/server'
import { UserButton } from '~/components/auth/user-button'
import { Bear } from '~/components/bear'
import { LanguageToggle } from '~/components/language/toggle'
import { LatestPost } from '~/components/post'
import { ThemeToggle } from '~/components/theme/toggle'
import { getServerSession } from '~/lib/auth'
import { api, HydrateClient } from '~/trpc/server'

export default async function HomePage() {
  const t = await getTranslations('HomePage')
  const session = await getServerSession()

  void api.post.getLatest.prefetch()

  return (
    <HydrateClient>
      <main className='flex min-h-screen flex-col items-center justify-center gap-10 py-10'>
        <ThemeToggle />
        <UserButton user={session?.user} />
        <p className='font-bold text-xl'>{t('title')}</p>
        <LanguageToggle />
        <LatestPost />
        <Bear />
      </main>
    </HydrateClient>
  )
}
