import { useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

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

type Props = {
  className?: string
  currentUserId?: string
  decks: Deck[] | undefined
  headerColumns?: Column[]
  onDeleteClick: (id: string, name: string) => void
  onEditClick: (id: string) => void
  onIconClick: (sort: string) => void
}
type Column = {
  key: string
  sortable?: boolean
  title: string
}
export const DecksTable = ({
  className,
  currentUserId,
  decks,
  headerColumns,
  onDeleteClick,
  onEditClick,
  onIconClick,
}: Props) => {
  const [searchParams] = useSearchParams()
  const sortOrder = searchParams.get('orderBy')?.split('-')[0] || 'updated'
  const sortAsc = searchParams.get('orderBy')?.split('-')[1] || 'desc'

  const handleSort = useCallback(
    (key: string) => {
      let newIsAsc = sortAsc

      if (sortOrder === key) {
        // Изменяем направление сортировки при повторном клике на ту же колонку
        newIsAsc = sortAsc === 'desc' ? 'asc' : 'desc'
      }
      onIconClick(`${key}-${newIsAsc}`)
    },
    [onIconClick, sortOrder, sortAsc]
  )

  const handleDeleteClick = useCallback(
    (id: string, name: string) => {
      onDeleteClick(id, name)
    },
    [onDeleteClick]
  )

  return (
    <Table.TRoot className={className}>
      <Table.THead>
        <Table.TRow className={s.tRowWrapper}>
          {headerColumns &&
            headerColumns.map(({ key, sortable, title }) => (
              <Table.Th
                className={!(sortable === false) ? s.thWrapperHover : ''}
                key={key}
                onClick={() => handleSort(key)}
              >
                <div className={s.orderWrapper}>
                  {title}
                  {sortable !== false &&
                    sortOrder === key &&
                    (sortAsc === 'desc' ? (
                      <ArrowIosDownOutline color={'#fff'} />
                    ) : (
                      <ArrowIosUp color={'#fff'} />
                    ))}
                </div>
              </Table.Th>
            ))}
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {decks?.map(deck => {
          const isCurrentUser = currentUserId === deck.userId

          return (
            <Table.TRow className={s.tRowWrapperHover} key={deck.id}>
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
                      onClick={() => onEditClick(deck.id)}
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
