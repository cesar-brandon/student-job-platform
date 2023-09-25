'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <Button
      variant="ghost"
      className='rounded-full px-6 py-4 hover:bg-gray-200 dark:hover:bg-slate-800 justify-start'
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {!theme ? (
        <SunIcon className="transition-all w-6 h-6 mr-4" />
      ) : theme === 'dark' ? (
        <MoonIcon className="transition-all w-6 h-6 mr-4" />
      ) : (
        <SunIcon className="transition-all w-6 h-6 mr-4" />
      )}
      Tema
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
