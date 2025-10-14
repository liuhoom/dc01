import { NavigationSideBar } from '@/components/navigation/navigation-sidebar'
import { UserButton } from '@clerk/nextjs'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full'>
      <div className='hidden md:flex h-full w-[72px] flex-col fixed inst-y-0 z-30'>
        <NavigationSideBar />
      </div>
      <main className='md:pl-[72px] h-full'>{children}</main>
    </div>
  )
}
