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
  onDeleteClick: (id: string, name: string) => void
  onEditClick: (id: string, name: string) => void
  onIconClick: () => void
}

export const DecksTable = ({
  className,
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
  onIconClick,
}: DecksTableProps) => {
  const [isAsc, setIsAsc] = useState(false)

  const handleDeleteClick = useCallback(
    (id: string, name: string) => {
      onDeleteClick(id, name)
    },
    [onDeleteClick]
  )

  const handleEditClick = useCallback(
    (id: string, name: string) => {
      onEditClick(id, name)
    },
    [onEditClick]
  )

  const handleSortClick = useCallback(() => {
    setIsAsc(prevIsAsc => !prevIsAsc)
    onIconClick()
  }, [onIconClick])

  return (
    <Table.TRoot className={className}>
      <Table.THead>
        <Table.TRow style={{ borderBottom: 'none' }}>
          <Table.Th style={{ width: '30%' }}>Name</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th>
            <div className={s.orderWrapper}>
              Last Updated
              {isAsc ? (
                <ArrowIosUp color={'#fff'} onClick={handleSortClick} />
              ) : (
                <ArrowIosDownOutline color={'#fff'} onClick={handleSortClick} />
              )}
            </div>
          </Table.Th>
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
                  imageUrl={deck.cover || 'src/assets/img/react.png'}
                  name={deck.name}
                />
              </Table.Td>
              <Table.Td>{deck.cardsCount}</Table.Td>
              <Table.Td>{new Date(deck.updated).toLocaleDateString('en-GB')}</Table.Td>
              <Table.Td>{deck.author.name}</Table.Td>
              <Table.Td className={s.withIcons}>
                <Button as={Link} className={s.button} to={`${deck.id}/learn`} type={'button'}>
                  <PlayCircleOutline />
                </Button>
                {isCurrentUser && (
                  <>
                    <Button
                      className={s.button}
                      onClick={() => handleEditClick(deck.id, deck.name)}
                      type={'button'}
                    >
                      <Edit2Outline />
                    </Button>
                    <Button
                      className={s.button}
                      onClick={() => handleDeleteClick(deck.id, deck.name)}
                      type={'button'}
                    >
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
