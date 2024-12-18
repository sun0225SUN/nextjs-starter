import { useTranslations } from 'next-intl'
import { LanguageToggle } from '~/components/language/toggle'
import { StoreDemo } from '~/components/store-demo'
import { ThemeToggle } from '~/components/theme/toggle'
import { HydrateClient } from '~/trpc/server'

export default function Home() {
  const t = useTranslations()

  return (
    <HydrateClient>
      <div className='flex h-screen flex-col items-center justify-center gap-8'>
        <StoreDemo />
        <div className='flex w-full items-center justify-center gap-4'>
          {t('hello')}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </HydrateClient>
  )
}
