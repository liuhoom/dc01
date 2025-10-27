import { NextRequest, NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string
    }
  }
) {
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    // const { memberId } = await params

    if (!serverId)
      return new NextResponse('Server ID is missing.', { status: 400 })

    if (!params.memberId)
      return new NextResponse('Member ID is missing.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error: unknown) {
    console.error('MEMBER_ID_DELETE Error: ', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}

export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string
    }
  }
) => {
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    const { role } = await req.json()

    // const { memberId } = await params

    if (!serverId)
      return new NextResponse('Server ID is missing.', { status: 400 })

    if (!params.memberId)
      return new NextResponse('Member ID is missing.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error: unknown) {
    console.error('[MEMBERS_ID_PATCH]: ', error)
    return new NextResponse('Internal Server error.', { status: 500 })
  }
}
