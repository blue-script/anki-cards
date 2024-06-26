import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { EditDeckModal } from '@/entities'
import { CardModal } from '@/entities/deck/cardModal/cardModal'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { Button, Typography } from '@/shared'

import s from './deckHeader.module.scss'

type Props = {
  cardsLength: number
  deckId: string
  deckName: string
  isOwner: boolean
}

export const DeckHeader = ({ cardsLength, deckId, deckName, isOwner }: Props) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const onOpenChange = () => {
    setOpen(!open)
  }

  return (
    <div className={s.cardsHeader}>
      <Button className={s.buttonBack} onClick={() => navigate('/')}>
        <ArrowBackOutline /> <Typography option={'body2'}>Back to Decks List</Typography>
      </Button>

      {isOwner ? (
        <OwnerContent
          cardsLength={cardsLength}
          deckId={deckId}
          deckName={deckName}
          onOpenChange={onOpenChange}
          open={open}
        />
      ) : (
        <FriendContent deckName={deckName} />
      )}
    </div>
  )
}

type FriendContentProps = {
  deckName: string
}

const FriendContent = ({ deckName }: FriendContentProps) => {
  const navigate = useNavigate()
  const onLearnDeck = () => {
    navigate('learn')
  }

  return (
    <div className={s.ownerContainer}>
      <div className={s.owner}>
        <Typography option={'h1'}>{deckName}</Typography>
      </div>
      <Button onClick={onLearnDeck}>Learn to Deck</Button>
    </div>
  )
}

type OwnerContentProps = {
  cardsLength: number
  deckId: string
  deckName: string
  onOpenChange: () => void
  open: boolean
}

const OwnerContent = ({ cardsLength, deckId, deckName, onOpenChange, open }: OwnerContentProps) => {
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId ?? '' })
  const [openEditDeckModal, setOpenEditNewDeckModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenEditNewDeckModal(prev => !prev)
  }

  return (
    <div className={s.ownerContainer}>
      <div className={s.owner}>
        <Typography option={'h1'}>{deckName}</Typography>
        {cardsLength > 0 && <DropDownDeck deckId={deckId} handleOpenModal={handleOpenModal} />}
      </div>
      {cardsLength > 0 && (
        <>
          <Button onClick={onOpenChange}>Add New Card</Button>
          {open && <CardModal onOpenChange={onOpenChange} open={open} />}
        </>
      )}
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
    </div>
  )
}
