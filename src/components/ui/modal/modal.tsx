import { ComponentPropsWithoutRef } from 'react'

import { Close } from '@/assets/icons'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type DialogDemoProps = {
  onOpenChange: () => void
  open: boolean
  title?: string
} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const Modal = ({ children, onOpenChange, open, title = 'Header' }: DialogDemoProps) => (
  <Dialog.Root open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={s.content}>
        <div className={s.header}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Close asChild>
            <Close aria-label={'Close'} onClick={onOpenChange} />
          </Dialog.Close>
        </div>
        <div className={s['modal-body']}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
