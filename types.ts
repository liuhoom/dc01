import { Member, Profile, Server } from './prisma/lib/generated/prisma'

export type ServerWithMembersWithProfile = Server & {
  members: (Member & {
    profile: Profile
  })[]
}
