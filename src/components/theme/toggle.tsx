'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div
      onClick={toggleTheme}
      className='cursor-pointer'
    >
      <Sun
        className='dark:hidden'
        size={22}
      />
      <Moon
        className='hidden dark:block'
        size={22}
      />
    </div>
  )
}
