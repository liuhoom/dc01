'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { InviteModal } from '../modals/invite-modal'
import { EditServerModal } from '../modals/edit-server-modal'

export default function ModalProvider() {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  )
}
