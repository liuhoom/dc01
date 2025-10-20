import { db } from '@/lib/db'
import { ServerHeader } from './server-header'
import { redirect } from 'next/navigation'
import { currentProfile } from '@/lib/current-profile'

interface ServerSideBarProps {
  serverId: string
}

export async function ServerSideBar({ serverId }: ServerSideBarProps) {
  const profile = await currentProfile()

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) return redirect('/')

  const role = server.members.find(
    (member) => member.profileId === profile?.id
  )?.role

  return (
    <div className='flex flex-col h-full text-primary w-full bg-[#F2F3F5] dark:bg-[#2B2D31]'>
      <ServerHeader server={server} role={role} />
    </div>
  )
}
