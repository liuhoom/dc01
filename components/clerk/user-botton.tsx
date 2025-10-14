'use client'

import { UserButton as ClerkUserButton, UserAvatar } from '@clerk/nextjs'

interface UserButtonProps {}

export function UserButton({}: UserButtonProps) {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: 'h-[48px] w-[48px]',
        },
      }}
      userProfileMode='navigation'
      userProfileUrl='/account'
    />
  )
}
