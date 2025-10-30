'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { MemberModal } from '@/components/modals/members-modal'
import { DeleteServer } from '@/components/modals/delete-server-modal'
import { CreateChannelModal } from '@/components/modals/create-channel-modal'

export default function ModalProvider() {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <DeleteServer />
    </>
  )
}
