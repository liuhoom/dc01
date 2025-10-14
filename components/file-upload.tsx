'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/lib/uploadthinig'

// import '@uploadthing/react/styles.css'

interface FileUploadProps {
  value: string
  onChange: (url?: string) => void
  endpoint: 'messageFile' | 'serverImage'
}

export function FileUpload({ value, onChange, endpoint }: FileUploadProps) {
  const fileType = value.split('.').pop()

  if (fileType !== 'pdf' && value) {
    return (
      <div className='relative h-20 w-20'>
        <Image fill src={value} alt='uplaod image' className='rounded-full' />

        <Button
          onClick={() => onChange('')}
          type='button'
          className='absolute top-0 right-0 rounded-full p-1 bg-rose-500 shadow-sm'
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    )
  }

  return (
    <UploadDropzone
      className='border-zinc-500 ut-button:bg-indigo-500 ut-button:ut-uploading:bg-indigo-500/70 after:ut-button:ut-uploading:bg-indigo-500 ut-label:text-indigo-500 hover:ut-label:text-indigo-500/70'
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl)
      }}
      onUploadError={(error) => {
        console.log('File Upload Error: ', error)
      }}
    />
  )
}
