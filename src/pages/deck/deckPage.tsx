import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { CardsTable, DeckHeader } from '@/entities'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { Button, Page, Pagination, TextField, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './deckPage.module.scss'

const defaultNumberPage = 1

export const DeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const debounceText = useDebounce<string>(search, 400)

  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState<number>(defaultNumberPage)

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }
  const handlePageSize = (value: number) => {
    setPageSize(value)
    setCurrentPage(defaultNumberPage)
  }
  const handlePageChange = (value: number) => {
    setCurrentPage(value)
  }

  const { data: deckData, error: deckError } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const { cards, error, pagination } = useGetCardsQuery(
    {
      currentPage: currentPage,
      id: deckId ?? '',
      itemsPerPage: pageSize,
      orderBy: 'question-asc',
      question: debounceText,
    },
    {
      selectFromResult: ({ data, error, isLoading }) => {
        return { cards: data?.items, error, isLoading, pagination: data?.pagination }
      },
    }
  )

  if (error || deckError) {
    return <div>{`Error: ${error || deckError}`}</div>
  }

  const isOwner = true //deckData?.userId === deckData?.userId //some logic
  const cardsLength = cards?.length ?? 0

  return (
    <Page className={s.page} mt={'24px'}>
      <DeckHeader cardsLength={cardsLength} isOwner={isOwner} />

      {cardsLength ? (
        <>
          {deckData?.cover && <img alt={'deck-img'} className={s.image} src={deckData.cover} />}

          <TextField
            fullWidth
            label={'search'}
            onValueChange={handleSearchChange}
            variant={'search'}
          />

          <CardsTable
            cards={cards}
            isOwner={isOwner}
            onDeleteClick={() => {}}
            onEditClick={() => {}}
          />
        </>
      ) : (
        <>
          <Typography option={'body1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button>Add New Card</Button>
        </>
      )}

      {pagination && pagination.totalItems > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
          pageSize={pagination.itemsPerPage}
          setPageSize={handlePageSize}
          totalCount={pagination.totalItems}
        />
      )}
    </Page>
  )
}
