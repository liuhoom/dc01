'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import axios from 'axios'

export function InviteModal() {
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const isModalOpen = isOpen && type === 'invite'

  const { server } = data
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)

      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )

      onOpen('invite', { server: response.data })
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500'>
            Server invite link
          </Label>

          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              className='text-black bg-zinc-300/30 dark:bg-zinc-300/10 dark:text-white cursor-pointer pointer-events-none'
              tabIndex={-1}
              value={inviteUrl}
              disabled={isLoading}
              aria-disabled
            />

            <ActionTooltip side='left' align='end' label='copy'>
              <Button
                disabled={isLoading}
                aria-disabled={isLoading}
                size='icon'
                onClick={onCopy}
              >
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </ActionTooltip>
          </div>

          <Button
            disabled={isLoading}
            aria-disabled={isLoading}
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 mt-4'
            onClick={onNew}
          >
            Generate a new link
            <RefreshCw className='h-4 w-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
