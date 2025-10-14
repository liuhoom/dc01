import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { UserButton } from '@/components/clerk/user-botton'
import { ThemeToggle } from '../theme-toggle'

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

        <UserButton />
      </div>
    </div>
  )
}
