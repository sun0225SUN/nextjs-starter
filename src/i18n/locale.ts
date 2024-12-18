'use server'

import { cookies } from 'next/headers'
import { routing } from '~/i18n/routing'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value ?? routing.defaultLocale
}

export async function setUserLocale(locale: string) {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
