import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { UserButton } from '@/components/clerk/user-botton'
import { ThemeToggle } from '@/components/theme-toggle'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationSideBarProps {}

export async function NavigationSideBar({}: NavigationSideBarProps) {
  const profile = await currentProfile()

  if (!profile) return redirect('/')

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  return (
    <div className='h-full flex flex-col bg-indigo-200 overflow-hidden justify-between'>
      <p className=''>Navigation Sidebar</p>

      <div className='flex flex-col items-center justify-center mb-8 gap-y-4'>
        <ThemeToggle />

        <SignedIn>
          <div className='hiddle md:block'>
            <UserButton />
          </div>

          <SignOutButton>
            <button
              className='md:hidden hover:bg-background/30 p-2.5 rounded-md'
              title='Log out'
            >
              <LogOut className='h-5 w-5 cursor-pointer' />
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}
