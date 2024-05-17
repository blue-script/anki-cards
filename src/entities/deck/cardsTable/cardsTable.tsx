import { CardRow } from '@/entities/deck/cardsTable/cardRow/cardRow'
import { Card } from '@/services/cards/cards.types'
import { Table } from '@/shared'

import s from './cardsTable.module.scss'

import { CardsHeader } from './cardsHeader'

type CardsTableProps = {
  cards: Card[] | undefined
  currentUserId?: string
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}

export const CardsTable = ({
  cards,
  currentUserId,
  onDeleteClick,
  onEditClick,
}: CardsTableProps) => {
  return (
    <Table.TRoot className={s.table}>
      <CardsHeader />
      <Table.TBody>
        {cards?.map(card => {
          const isOwner = currentUserId === card.userId

          return (
            <CardRow
              {...card}
              isOwner={isOwner}
              key={card.id}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
            />
          )
        })}
      </Table.TBody>
    </Table.TRoot>
  )
}
