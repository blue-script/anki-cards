import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  ArrowIosDownOutline,
  ArrowIosUp,
  Edit2Outline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons'
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
  onIconClick: () => void
}

type DeckTableRowProps = {
  deck: Deck
  handleDeleteClick: (id: string) => void
  handleEditClick: (id: string) => void
  isCurrentUser: boolean
}

const DeckTableRow = ({
  deck,
  handleDeleteClick,
  handleEditClick,
  isCurrentUser,
}: DeckTableRowProps) => (
  <Table.TRow key={deck.id}>
    <Table.Td className={s.firstColumn}>
      <TableCellContent
        href={`decks/${deck.id}`}
        imageUrl={deck.cover || 'src/assets/img/react.png'}
        name={deck.name}
      />
    </Table.Td>
    <Table.Td>{deck.cardsCount}</Table.Td>
    <Table.Td>{new Date(deck.updated).toLocaleDateString('en-GB')}</Table.Td>
    <Table.Td>{deck.author.name}</Table.Td>
    <Table.Td className={s.withIcons}>
      <Button as={Link} className={s.button} to={`decks/${deck.id}`}>
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

export const DecksTable = ({
  className,
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
  onIconClick,
}: DecksTableProps) => {
  const [isAsc, setIsAsc] = useState(false)

  const handleIconClick = useCallback(() => {
    setIsAsc(prevIsAsc => !prevIsAsc)
    onIconClick()
  }, [onIconClick])

  const handleDeleteClick = useCallback(
    (id: string) => {
      onDeleteClick(id)
    },
    [onDeleteClick]
  )

  const handleEditClick = useCallback(
    (id: string) => {
      onEditClick(id)
    },
    [onEditClick]
  )

  return (
    <Table.TRoot className={className}>
      <Table.THead>
        <Table.TRow style={{ borderBottom: 'none' }}>
          <Table.Th className={s.firstColumn}>Name</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th>
            <div className={s.orderWrapper}>
              Last Updated
              {isAsc ? (
                <ArrowIosUp color={'#fff'} onClick={handleIconClick} />
              ) : (
                <ArrowIosDownOutline color={'#fff'} onClick={handleIconClick} />
              )}
            </div>
          </Table.Th>
          <Table.Th>Created By</Table.Th>
          <Table.Th></Table.Th>
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {decks?.map(deck => (
          <DeckTableRow
            deck={deck}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            isCurrentUser={currentUserId === deck.userId}
            key={deck.id}
          />
        ))}
      </Table.TBody>
    </Table.TRoot>
  )
}
