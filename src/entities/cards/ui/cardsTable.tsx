import { Edit2Outline, TrashOutline } from '@/assets/icons'
import { Card } from '@/services/cards/cards.types'
import { Button, Table } from '@/shared'

import s from '@/entities/decks/ui/decksTable.module.scss'

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
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)

  return (
    <Table.TRoot>
      <Table.THead>
        <Table.TRow>
          <Table.Th>Question</Table.Th>
          <Table.Th>Answer</Table.Th>
          <Table.Th>
            Last Updated <button>arrow</button>
          </Table.Th>
          <Table.Th>Grade</Table.Th>
          <Table.Th></Table.Th>
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {cards?.map(card => {
          const isOwner = currentUserId === card.userId

          return (
            <Table.TRow key={card.id}>
              <Table.Td>{card.question || card.questionImg || card.questionVideo}</Table.Td>
              <Table.Td>{card.answer || card.answerImg || card.answerVideo}</Table.Td>
              <Table.Td>{new Date(card.updated).toLocaleDateString('ru-ru')}</Table.Td>
              <Table.Td></Table.Td>
              <Table.Td>
                {isOwner && (
                  <>
                    <Button className={s.button} onClick={() => handleEditClick(card.id)}>
                      <Edit2Outline />
                    </Button>
                    <Button className={s.button} onClick={() => handleDeleteClick(card.id)}>
                      <TrashOutline />
                    </Button>
                  </>
                )}
              </Table.Td>
            </Table.TRow>
          )
        })}
      </Table.TBody>
    </Table.TRoot>
  )
}
