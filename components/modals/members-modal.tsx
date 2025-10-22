'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfile } from '@/types'

export function MemberModal() {
  const { isOpen, onClose, onOpen, type, data } = useModal()

  const isModalOpen = isOpen && type === 'members'
  const { server } = data as { server: ServerWithMembersWithProfile }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Manage Members
          </DialogTitle>

          <DialogDescription className='text-zinc-500 text-center'>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <div className='p-6'>Manager Members</div>
      </DialogContent>
    </Dialog>
  )
}
