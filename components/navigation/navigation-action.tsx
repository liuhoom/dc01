'use client'

import { Plus } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'

interface NavigationActionProps {}

export function NavigationAction({}: NavigationActionProps) {
  const { onOpen } = useModal()

  return (
    <ActionTooltip label='Add a server' align='center' side='right'>
      <button
        className='group flex items-center'
        onClick={() => onOpen('createServer')}
      >
        <div className='flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:rounded-[16px] group-hover:bg-emerald-500'>
          <Plus
            className='group-hover:text-white transition text-emerald-500'
            size={25}
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
