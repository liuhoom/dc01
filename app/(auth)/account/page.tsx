'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { MoveLeft } from 'lucide-react'

export default function AccountPage() {
  const { theme } = useTheme()

  return (
    <div className='fd:flex space-y-5 h-full space-x-20'>
      <Link
        href='/'
        className='group flex h-5 w-auto items-center justify-center space-x-2 mt-10 text-zinc-500'
      >
        <MoveLeft className='h-5 w-5 transition gorup-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5' />

        <Image
          src='/logo.png'
          alt='Next.js Logo'
          width={18}
          height={18}
          className='group-hover:scale-[0.9] group-focus-visible:scale-[0.9]'
        />

        <span className='font-xs font-semibold'>Go back</span>
      </Link>

      <UserProfile
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  )
}
