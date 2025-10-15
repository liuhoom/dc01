import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { UserButton } from '@/components/clerk/user-botton'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavigationItem } from './navigation-item'
import { NavigationAction } from './navigation-action'

interface NavigationSideBarProps {}

export async function NavigationSideBar({}: NavigationSideBarProps) {
  const profile = await currentProfile()

  if (!profile) return redirect('/')

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  return (
    <div className='flex flex-col h-full w-full overflow-hidden items-center text-primary space-y-4 py-3 bg-[#E3E5E8] dark:bg-[#1E1F22]'>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='logo png'
          width={32}
          height={32}
          className='rounded-full'
        />
      </Link>

      <Separator className='w-10 px-auto h-[2px] bg-zinc-300 rounded-md dark:bg-zinc-700' />

      <NavigationAction />

      <ScrollArea className='flex-1 w-full'>
        {servers.map((server) => (
          <div className='mb-4' key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

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
