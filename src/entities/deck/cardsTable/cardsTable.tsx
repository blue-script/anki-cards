import { CardRow, CardsHeader } from '@/entities'
import { Card } from '@/services/cards/cards.types'
import { Table } from '@/shared'

import s from './cardsTable.module.scss'

type CardsTableProps = {
  cards: Card[] | undefined
  isOwner: boolean
}

export const CardsTable = ({ cards, isOwner }: CardsTableProps) => {
  return (
    <Table.TRoot className={s.table}>
      <CardsHeader />
      <Table.TBody>
        {cards?.map(card => <CardRow {...card} isOwner={isOwner} key={card.id} />)}
      </Table.TBody>
    </Table.TRoot>
  )
}
