import { Modal } from '@/shared'

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      Lorem ipsum dolor sit amet
    </Modal>
  )
}
