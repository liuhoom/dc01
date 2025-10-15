'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

interface UserButtonProps {}

export function UserButton({}: UserButtonProps) {
  const { theme } = useTheme()

  return (
    <ClerkUserButton
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        elements: {
          avatarBox: 'h-[48px] w-[48px]',
        },
      }}
      userProfileMode='navigation'
      userProfileUrl='/account'
    />
  )
}
