'use client'

import { useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ThemeToastContainer() {
  const { resolvedTheme } = useTheme()

  return <ToastContainer theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
}
