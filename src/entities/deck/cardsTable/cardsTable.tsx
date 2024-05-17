<<<<<<<< HEAD:src/entities/deck/cardsTable/cardsTable.tsx
import { CardRow } from '@/entities/deck/cardsTable/cardRow/cardRow'
========
import { CardRow } from '@/entities/cards/cardsTable/cardRow/cardRow'
>>>>>>>> 4eb6ec14e91f68fbb5600a29b59b3d8507a6abae:src/entities/cards/cardsTable/cardsTable.tsx
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
