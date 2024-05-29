import { Modal, Typography } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'

import s from './deleteCardModal.module.scss'

type Props = {
  closeModal: () => void
  onDeleteCard: () => void
  open: boolean
}

export const DeleteCardModal = ({ closeModal, onDeleteCard, open }: Props) => {
  return (
    <Modal onOpenChange={closeModal} open={open} title={'Delete Card'}>
      <Typography className={s.text} option={'subtitle1'}>
        Do you really want to remove Card Name? All cards will be deleted
      </Typography>
      <Modal.Footer
        countButton={CountButton.Two}
        firstButtonHandler={onDeleteCard}
        firstButtonName={'Delete Card'}
        secondButtonHandler={closeModal}
        secondButtonName={'Cancel'}
      ></Modal.Footer>
    </Modal>
  )
}
