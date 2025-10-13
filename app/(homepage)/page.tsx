import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div className='flex w-full'>
      <Link href='/' className='flex items-center'>
        <div className='relative w-8 h-8 mr-4'>
          <Image
            className='dark:invert'
            src='/logo.png'
            alt='Next.js Logo'
            fill
          />
        </div>
      </Link>
      <div className='justify-end'>
        <UserButton />
      </div>
    </div>
  )
}
