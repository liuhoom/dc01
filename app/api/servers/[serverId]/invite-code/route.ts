import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()
    const { serverId } = await params

    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    if (!serverId)
      return new NextResponse('Server ID is missing.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('[SERVER_ID]: ', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}
