import { useTranslations } from 'next-intl'
import { LanguageToggle } from '~/components/language/toggle'
import { StoreDemo } from '~/components/store-demo'
import { ThemeToggle } from '~/components/theme/toggle'
import { HydrateClient } from '~/trpc/server'

export default function Home() {
  const t = useTranslations()

  return (
    <HydrateClient>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center gap-6'>
          <StoreDemo />
          {t('hello')}
          <div className='flex items-center gap-4'>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </HydrateClient>
  )
}
