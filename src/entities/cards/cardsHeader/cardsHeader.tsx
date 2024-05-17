import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { Button, Typography } from '@/shared'

import s from './cardsHeader.module.scss'

type Props = {
  isOwner: boolean
}

export const CardsHeader = ({ isOwner }: Props) => {
  const navigate = useNavigate()

  const handleAddCard = () => {}

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
          <Button onClick={handleAddCard}>Add New Card</Button>
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
