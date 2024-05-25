import { CardRow, CardsHeader } from '@/entities'
import { Card } from '@/services/cards/cards.types'
import { Table } from '@/shared'

import s from './cardsTable.module.scss'

type CardsTableProps = {
  cards: Card[] | undefined
  isOwner: boolean
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}

export const CardsTable = ({ cards, isOwner, onDeleteClick, onEditClick }: CardsTableProps) => {
  return (
    <Table.TRoot className={s.table}>
      <CardsHeader />
      <Table.TBody>
        {cards?.map(card => (
          <CardRow
            {...card}
            isOwner={isOwner}
            key={card.id}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        ))}
      </Table.TBody>
    </Table.TRoot>
  )
}
