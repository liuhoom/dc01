'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useModal } from '@/hooks/use-modal-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { FileUpload } from '../file-upload'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is reuquired',
  }),
})

export function CreateServerModal() {
  const { isOpen, onClose, type } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createServer'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Create your server
          </DialogTitle>

          <DialogDescription className='text-zinc-500 text-center text-sm'>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoCapitalize='off'
            autoComplete='off'
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  name='imageUrl'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='serverImage'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-zinc-500 text-xs font-bold'>
                      Server Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder='Enter your servername'
                        className='dark:bg-zinc-300/10 bg-zinc-300/50 border-0 dark:text-white text-black'
                        {...field}
                      />
                    </FormControl>

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
