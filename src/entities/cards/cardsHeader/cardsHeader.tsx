import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { AddCardModal } from '@/entities'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { Button, Typography } from '@/shared'

import s from './cardsHeader.module.scss'

type Props = {
  isOwner: boolean
}

export const CardsHeader = ({ isOwner }: Props) => {
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
        <div className={s.ownerContainer}>
          <div className={s.owner}>
            <Typography option={'h1'}>My Deck</Typography>
            <DropDownDeck />
          </div>
          <Button onClick={onOpenChange}>Add New Card</Button>
          <AddCardModal onOpenChange={onOpenChange} open={open} />
        </div>
      ) : (
        <div className={s.ownerContainer}>
          <div className={s.owner}>
            <Typography option={'h1'}>Friend’s Deck</Typography>
          </div>
          <Button>Learn to Deck</Button>
        </div>
      )}
    </div>
  )
}
