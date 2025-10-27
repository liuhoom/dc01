'use client'

import { cn } from '@/lib/utils'

import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  alt: string
  src?: string
  className?: string
}

export function UserAvatar({ alt, src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} alt={alt} className={className} />
    </Avatar>
  )
}
