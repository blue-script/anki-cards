import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { CardsTable } from '@/entities/cards'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { Button, Dropdown, Page, Pagination, TextField, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
  const navigate = useNavigate()
  const { deckId } = useParams<{ deckId: string }>()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const debounceText = useDebounce<string>(search, 400)
  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const [pageSize, setPageSize] = useState(5)
  const handlePageSize = (value: number) => {
    setPageSize(value)
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
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

  const isOwner = deckData?.userId === deckData?.userId //some logic

  return (
    <Page mt={'24px'}>
      <Button className={s.buttonBack} onClick={() => navigate('/')}>
        <ArrowBackOutline /> <Typography option={'body2'}>Back to Decks List</Typography>
      </Button>

      <div className={s.ownerAndLearn}>
        <div className={s.owner}>
          <Typography option={'h1'}>{isOwner ? 'My Deck' : 'Friend’s Deck'}</Typography>
          <DropDownDeck />
        </div>

        <Button>Learn to Deck</Button>
      </div>
      {deckData?.cover && <img alt={'deck-img'} className={s.image} src={deckData.cover} />}
      {isOwner && <Dropdown.Root></Dropdown.Root>}

      <TextField fullWidth label={'search'} onValueChange={handleSearchChange} variant={'search'} />
      <CardsTable cards={cards} onDeleteClick={() => {}} onEditClick={() => {}} />
      {pagination && (
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
