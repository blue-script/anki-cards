import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { AddCardModal } from '@/entities'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { Button, Typography } from '@/shared'

import s from './deckHeader.module.scss'

type Props = {
  cardsLength: number
  deckId: string
  isOwner: boolean
}

export const DeckHeader = ({ cardsLength, deckId, isOwner }: Props) => {
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
          onOpenChange={onOpenChange}
          open={open}
        />
      ) : (
        <FriendContent />
      )}
    </div>
  )
}

const FriendContent = () => {
  return (
    <div className={s.ownerContainer}>
      <div className={s.owner}>
        <Typography option={'h1'}>Friend’s Deck</Typography>
      </div>
      <Button>Learn to Deck</Button>
    </div>
  )
}

type OwnerContentProps = {
  cardsLength: number
  deckId: string
  onOpenChange: () => void
  open: boolean
}

const OwnerContent = ({ cardsLength, deckId, onOpenChange, open }: OwnerContentProps) => {
  return (
    <div className={s.ownerContainer}>
      <div className={s.owner}>
        <Typography option={'h1'}>My Cards</Typography>
        {cardsLength > 0 && <DropDownDeck deckId={deckId} />}
      </div>
      {cardsLength > 0 && (
        <>
          <Button onClick={onOpenChange}>Add New Card</Button>
          <AddCardModal onOpenChange={onOpenChange} open={open} />
        </>
      )}
    </div>
  )
}
