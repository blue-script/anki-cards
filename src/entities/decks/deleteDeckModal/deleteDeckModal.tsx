import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Modal, Typography } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'

import s from './deleteDeckModal.module.scss'

type Props = {
  deckId: string
  name?: string
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const DeleteDeckModal = ({ deckId, name, open, setOpen, title }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const handleDeleteDeck = async () => {
    try {
      await deleteDeck({ id: deckId }).unwrap()
      setOpen(false)
    } catch (error) {
      console.error('Failed to delete deck:', error)
    }
  }

  return (
    <Modal onOpenChange={() => setOpen(!open)} open={open} title={title}>
      <Typography className={s.text} option={'body1'}>
        Do you really want to remove Deck named <strong className={s.name}>{name}</strong> ? <br />{' '}
        Deck and all cards will be deleted !!!
      </Typography>
      <Modal.Footer
        countButton={CountButton.Two}
        firstButtonHandler={handleDeleteDeck}
        firstButtonName={title}
        secondButtonHandler={() => setOpen(!open)}
        secondButtonName={'Cancel'}
      ></Modal.Footer>
    </Modal>
  )
}
