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
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={
        resolvedTheme === 'light'
          ? 'Switch to dark mode'
          : 'Switch to light mode'
      }
      className='flex items-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-gray-800'
    >
      <Sun
        className='dark:hidden'
        size={22}
      />
      <Moon
        className='hidden dark:block'
        size={22}
      />
    </button>
  )
}
