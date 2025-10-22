import { type NextRequest, NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      serverId: string
    }
  }
) => {
  try {
    const profile = await currentProfile()

    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    const { serverId } = params
    const { name, imageUrl } = await req.json()

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile?.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('[EDIT SERVER]: ', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}
