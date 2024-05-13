import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons'
import { Button, Typography } from '@/components'
import { Table } from '@/components/ui/table/table'
import { Deck } from '@/services/decks/decks.types'

import s from './decks-table.module.scss'

type DecksTableProps = {
  currentUserId?: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}

export const DecksTable = ({
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
    <Table.TRoot>
      <Table.THead>
        <Table.TRow style={{ borderBottom: 'none' }}>
          <Table.Th>Name</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th>Last Updated</Table.Th>
          <Table.Th>Author</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {decks?.map(deck => {
          const isCurrentUser = currentUserId === deck.userId

          return (
            <Table.TRow key={deck.id}>
              <Table.Td>
                <Typography as={'a'} href={`decks/${deck.id}`} option={'body2'}>
                  {deck.name}
                </Typography>
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
                    <Button className={s.button}>
                      <Edit2Outline onClick={() => handleEditClick(deck.id)} />
                    </Button>
                    <Button className={s.button}>
                      <TrashOutline onClick={() => handleDeleteClick(deck.id)} />
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
