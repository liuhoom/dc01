'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { useModal } from '@/hooks/use-modal-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function DeleteServer() {
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteServer'

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Delete Server
          </DialogTitle>

          <DialogDescription className='text-center'>
            Are you sure you want to to do this? <br />
            <span className='text-indigo-500 font-semibold'>
              {server?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='px-6 py-4 bg-gray-100/90 dark:bg-gray-100/10'>
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClose}
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onDelete}
              variant='destructive'
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
