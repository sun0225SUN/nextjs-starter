import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const localeMap: Record<string, string> = {
  zh: "简体中文",
  en: "English",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["zh", "en"],

  // Used when no locale matches
  defaultLocale: "en",

  // never prefix the default locale
  localePrefix: "never",
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
