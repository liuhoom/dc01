'use client'

import {
  ChevronDown,
  CirclePlus,
  LogOut,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfile } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MemberRole } from '@/prisma/lib/generated/prisma'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile
  role?: string
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModal()

  let isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex px-3 items-center w-full text-md font-semibold h-12 border-neutral-200 border-b-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 dark:border-neutral-600'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 text-xs font-medium text-black space-y-[2px] dark:text-neutral-400'>
        {isModerator && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer text-indigo-600 dark:text-indigo-400'
            onClick={() => onOpen('invite', { server })}
          >
            Invite People
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Server Settings
            <Settings className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Manage Members
            <Users className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Create Channel
            <CirclePlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer text-rose-500'>
            Delete Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer text-rose-500'>
            Leave Server
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
