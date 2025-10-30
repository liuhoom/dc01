'use client'

import { useModal } from '@/hooks/use-modal-store'
import { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

interface CreateChannelModalProps {}

export function CreateChannelModal({}: CreateChannelModalProps) {
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const isModalOpen = isOpen && type === 'createChannel'

  const [isLoading, setIsloading] = useState(false)

  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContent>heheda</DialogContent>
    </Dialog>
  )
}
