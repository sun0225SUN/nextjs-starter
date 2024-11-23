"use client"

import { Check, Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { setUserLocale } from "~/i18n/locale"
import { localeMap, routing } from "~/i18n/routing"

export function LanguageToggle() {
  const router = useRouter()
  const currentLocale = useLocale()

  const { locales } = routing

  const handleLocaleChange = (locale: string) => {
    setUserLocale(locale)
      .then(() => {
        router.refresh()
      })
      .catch(() => {
        console.error("Failed to set user locale")
      })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Languages size={22} strokeWidth={1.6} />
      </PopoverTrigger>
      <PopoverContent className="flex w-[150px] flex-col gap-2 px-0 py-2">
        {locales.map((locale) => (
          <div
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            <span className="size-5 flex-shrink-0 scale-125">
              {locale === "zh" ? "🇨🇳" : "🇬🇧"}
            </span>
            <span className="font-medium">{localeMap[locale]}</span>
            {locale === currentLocale && (
              <Check className="size-5" strokeWidth={2} />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
