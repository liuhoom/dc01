import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function ComponentName({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col h-full justify-center items-center gap-y-8'>
      <Link href='/' className='flex items-center'>
        <div className='relative w-8 h-8 mr-4'>
          <Image src='/logo.png' alt='Next.js Logo' fill />
        </div>

        <p className='text-2xl font-bold'>Genius</p>
      </Link>

      {children}
    </div>
  )
}
