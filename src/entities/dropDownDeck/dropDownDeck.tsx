import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Edit2, MoreVerticalOutline, PlayCircleOutline, Trash } from '@/assets/icons'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Dropdown, Typography } from '@/shared'

type Props = { deckId: string; handleOpenModal: () => void }

export const DropDownDeck = ({ deckId, handleOpenModal }: Props) => {
  const navigate = useNavigate()

  const [deleteDeck] = useDeleteDeckMutation()

  const onDeleteDeck = () => {
    deleteDeck({ id: deckId })
      .unwrap()
      .then(() => {
        navigate('/decks')
        toast.success('Deck deleted successfully.')
      })
      .catch(err => toast.error('Failed to delete deck:', err))
  }

  const onLearnDeck = () => {
    navigate('learn')
  }

  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <MoreVerticalOutline />
      </Dropdown.Trigger>
      <Dropdown.Content align={'end'}>
        <Dropdown.Item onClick={onLearnDeck}>
          <PlayCircleOutline />
          <Typography as={'span'} option={'caption'}>
            Learn
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={handleOpenModal}>
          <Edit2 />
          <Typography as={'span'} option={'caption'}>
            Edit
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={onDeleteDeck}>
          <Trash />
          <Typography as={'span'} option={'caption'}>
            Delete
          </Typography>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
