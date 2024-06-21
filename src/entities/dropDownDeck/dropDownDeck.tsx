import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Edit2, MoreVerticalOutline, PlayCircleOutline, Trash } from '@/assets/icons'
import { EditDeckModal } from '@/entities'
import { useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { Dropdown, Typography } from '@/shared'

type Props = { deckId: string }

export const DropDownDeck = ({ deckId }: Props) => {
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId ?? '' })
  const navigate = useNavigate()

  const [deleteDeck] = useDeleteDeckMutation()
  const [openEditDeckModal, setOpenEditNewDeckModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenEditNewDeckModal(prev => !prev)
  }

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
          {openEditDeckModal && (
            <EditDeckModal
              cover={deckData?.cover}
              deckId={deckId}
              isPrivate={deckData?.isPrivate || true}
              name={deckData?.name || ''}
              open={openEditDeckModal}
              setOpen={setOpenEditNewDeckModal}
              title={'Edit Deck'}
            />
          )}
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
