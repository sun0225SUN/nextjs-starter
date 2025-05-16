import { getTranslations } from 'next-intl/server'
import { Bear } from '~/components/bear'
import { LanguageToggle } from '~/components/language/toggle'
import { LatestPost } from '~/components/post'
import { ThemeToggle } from '~/components/theme/toggle'
import { HydrateClient, api } from '~/trpc/server'

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' })

  const t = await getTranslations('HomePage')

  void api.post.getLatest.prefetch()

  return (
    <HydrateClient>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='container flex flex-col items-center justify-center gap-8 px-4 py-16'>
          <h1>{t('title')}</h1>

          <LanguageToggle />

          <ThemeToggle />

          <Bear />

          <div className='flex flex-col items-center gap-2'>
            <p className='text-2xl'>
              {hello ? hello.greeting : 'Loading tRPC query...'}
            </p>
          </div>

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  )
}
