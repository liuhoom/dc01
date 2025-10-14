'use client'

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { FileUpload } from '../file-upload'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

export function InitialModal() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl:
        'https://rlbgo4z40o.ufs.sh/f/DFtlc0t7qhOH3RKl8pjRd7jGFArKUksg3Lo2VOp4YxXhyDZT',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <Dialog open>
      <DialogContent className='p-0 items-center overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl font-semibold text-center'>
            Create you server
          </DialogTitle>

          <DialogDescription className='text-zinc-500 text-center'>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
            autoCapitalize='off'
            autoComplete='off'
          >
            <div className='space-y-8 px-6 '>
              <div className='flex relative flex-col items-center text-center justify-center'>
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
                    <FormLabel className='uppercase font-bold text-xs text-zinc-500'>
                      Server name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Enter server name'
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        className='dark:bg-zinc-300/10 bg-zick-300/50 border-2 dark:text-white text-black'
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
