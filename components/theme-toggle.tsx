'use client'

import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <div className='flex gap-x-8 items-center'>
      <Button
        variant='ghost'
        onClick={toggleTheme}
        size='icon'
        className='group/toggle h-10 w-10'
      >
        <Sun className='h-[1.4rem] w-[1.4rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
        <Moon className='h-[1.4rem] w-[1.4rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 absolute' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </div>
  )
}
