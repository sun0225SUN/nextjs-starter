import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '~/components/theme/provider'
import { type Locale, routing } from '~/i18n/routing'
import '~/styles/globals.css'
import { Geist } from 'next/font/google'
import { cn } from '~/lib/utils'
import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'Next.js starter',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  // eslint-disable-next-line
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={cn(geist.variable, geist.className)}>
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
