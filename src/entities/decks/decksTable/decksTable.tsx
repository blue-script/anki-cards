import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons'
import { Deck } from '@/services/decks/decks.types'
import { Button, Typography } from '@/shared'
import { Table } from '@/shared/ui/table/table'

import s from './decksTable.module.scss'

type DecksTableProps = {
  currentUserId?: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
  // onSort: (sort: string) => void
}

export const DecksTable = ({
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick /*onSort,*/,
}: DecksTableProps) => {
  const handleDeleteClick = (id: string) => {
    onDeleteClick(id)
  }

  const handleEditClick = (id: string) => {
    onEditClick(id)
  }

  /*  let sortable = 'desc'

  const handleSort = (sort: string) => {
    onSort(sort === 'desc' ? (sortable = 'asc') : (sortable = 'desc'))
  }*/

  return (
    <Table.TRoot>
      <Table.THead>
        <Table.TRow style={{ borderBottom: 'none' }}>
          <Table.Th>Name</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th
          // onClick={handleSort(sortable)}
          >
            Last Updated
            {/*<span>{sortable === 'asc' ? '▲' : '▼'}</span>*/}
          </Table.Th>
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
