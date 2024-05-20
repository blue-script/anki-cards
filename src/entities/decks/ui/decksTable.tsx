import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons'
import { Deck } from '@/services/decks/decks.types'
import { Button } from '@/shared'
import { Table } from '@/shared/ui/table/table'
import { TableCellContent } from '@/shared/ui/table/tableCellContent'

import s from './decksTable.module.scss'

type DecksTableProps = {
  className?: string
  currentUserId?: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}

export const DecksTable = ({
  className,
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
}: DecksTableProps) => {
  const handleDeleteClick = (id: string) => {
    onDeleteClick(id)
  }

  const handleEditClick = (id: string) => {
    onEditClick(id)
  }

  return (
    <Table.TRoot className={className}>
      <Table.THead>
        <Table.TRow style={{ borderBottom: 'none' }}>
          <Table.Th>Name</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th>Last Updated</Table.Th>
          <Table.Th>Created By</Table.Th>
          <Table.Th></Table.Th>
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {decks?.map(deck => {
          const isCurrentUser = currentUserId === deck.userId

          return (
            <Table.TRow key={deck.id}>
              <Table.Td>
                <TableCellContent
                  href={`decks/${deck.id}`}
                  imageUrl={'src/assets/img/react.png'}
                  name={deck.name}
                />
              </Table.Td>
              <Table.Td>{deck.cardsCount}</Table.Td>
              <Table.Td>{new Date(deck.updated).toLocaleDateString('en-GB')}</Table.Td>
              <Table.Td>{deck.author.name}</Table.Td>
              <Table.Td className={s.withIcons}>
                <Button as={'a'} className={s.button} href={`decks/${deck.id}/learn`}>
                  <PlayCircleOutline />
                </Button>
                {isCurrentUser && (
                  <>
                    <Button className={s.button} onClick={() => handleEditClick(deck.id)}>
                      <Edit2Outline />
                    </Button>
                    <Button className={s.button} onClick={() => handleDeleteClick(deck.id)}>
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