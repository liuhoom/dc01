'use client'

import { useParams, useRouter } from 'next/navigation'
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ChannelType } from '@/prisma/lib/generated/prisma'
import { useModal } from '@/hooks/use-modal-store'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    })
    .refine((name) => name !== 'general', {
      message: 'Channel name cannot be "general".',
    }),
  type: z.enum(ChannelType),
})

export function CreateChannelModal() {
  const { isOpen, onClose, type, data } = useModal()
  const { channelType } = data
  const router = useRouter()
  const params = useParams()

  const isModalOpen = isOpen && type === 'createChannel'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channelType) form.setValue('type', channelType)
    else form.setValue('type', ChannelType.TEXT)
  }, [channelType, form])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/channels?serverId=${params?.serverId}`, values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog onOpenChange={handleClose} open={isModalOpen}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-center font-bold text-2xl'>
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
            autoCapitalize='off'
            autoComplete='off'
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-center uppercase text-xs font-bold text-zinc-500'>
                      Channel name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder='Enter channel name'
                        className='border-0 bg-zinc-300/50 dark:bg-zinc-300/10 text-black dark:text-white'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='type'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel type</FormLabel>

                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-zinc-300/50 dark:bg-zinc-300/10 capitalize'>
                          <SelectValue placeholder='Select a channel type' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className='capitalize'
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='px-6 py-4'>
              <Button
                disabled={isLoading}
                aria-disabled={isLoading}
                variant='primary'
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
