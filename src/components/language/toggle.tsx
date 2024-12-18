'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { setUserLocale } from '~/i18n/locale'
import { localeMap, useRouter } from '~/i18n/routing'
import { cn } from '~/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const currentLocale = useLocale()
  const router = useRouter()
  const [selectedLocale, setSelectedLocale] = useState(currentLocale)

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale)
    setUserLocale(locale)
      .then(() => {
        router.refresh()
      })
      .catch(() => {
        console.error('Failed to set user locale')
      })
  }

  return (
    <div className={cn(className)}>
      <Select
        value={selectedLocale}
        onValueChange={handleLocaleChange}
      >
        <SelectTrigger className='w-[140px] border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:ring-0'>
          <span className='text-xl'>
            {selectedLocale === 'en' ? '🇺🇸' : '🇨🇳'}
          </span>
          <SelectValue placeholder={localeMap[selectedLocale]} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value='en'
            className='cursor-pointer'
          >
            English
          </SelectItem>
          <SelectItem
            value='zh'
            className='cursor-pointer'
          >
            简体中文
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
