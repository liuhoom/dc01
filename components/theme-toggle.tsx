'use client'

import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ThemeToggleProps {}

const META_THEME_COLOR = {
  light: '#FFFFFF',
  dark: '#09090B',
}

export function ThemeToggle({}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()

  const setMetaColor = useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

    setMetaColor(
      resolvedTheme === 'dark' ? META_THEME_COLOR.light : META_THEME_COLOR.dark
    )
  }, [resolvedTheme, setTheme, setMetaColor])

  return (
    <Button
      variant='ghost'
      className='group/toggle h-8 w-8 px-0'
      onClick={toggleTheme}
    >
      <SunIcon className='hidden !h-5 !w-fit [html.dark_&]:blcok' />
      <MoonIcon className='hidden !h-5 !w-fit [html.light_&]:blcok' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
