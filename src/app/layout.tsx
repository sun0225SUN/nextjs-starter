import '~/styles/globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { ThemeProvider } from '~/components/theme/provider'
import { ThemeToastContainer } from '~/components/theme/toast-container'
import { TopLoader } from '~/components/top-loader'
import { cn } from '~/lib/utils'
import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  title: 'Nextjs Starter',
  description: 'Nextjs Starter',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(geist.variable)}
    >
      <body>
        <TRPCReactProvider>
          <NextIntlClientProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <TopLoader />
              <ThemeToastContainer />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
