import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { CardsTable } from '@/entities/cards'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { Button, Dropdown, Page, Pagination, TextField, Typography } from '@/shared'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
  const navigate = useNavigate()
  const { deckId } = useParams<{ deckId: string }>()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const {
    data: deckData,
    error: deckError,
    isLoading: deckIsLoading,
  } = useGetDeckByIdQuery({ id: deckId ?? '' })
  const { data, error, isLoading } = useGetCardsQuery(
    // desc or asc ???? not work
    { currentPage: 1, id: deckId ?? '', itemsPerPage: 5, orderBy: '', question: search },
    { skip: !deckId }
  )

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  if (!deckId) {
    return <div>Invalid card ID</div>
  }

  if (isLoading || deckIsLoading) {
    return <div>LOADING...</div>
  }

  if (error || deckError) {
    return <div>{`Error: ${error || deckError}`}</div>
  }

  if (!deckData) {
    return <div>Some error...</div>
  }

  const isOwner = deckData.userId === deckData.userId //some logic

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
      {deckData.cover && <img alt={'deck-img'} className={s.image} src={deckData.cover} />}
      {isOwner && <Dropdown.Root></Dropdown.Root>}

      <TextField fullWidth label={'search'} onValueChange={handleSearchChange} variant={'search'} />
      <CardsTable cards={data?.items} onDeleteClick={() => {}} onEditClick={() => {}} />
      {data?.pagination && (
        <Pagination
          currentPage={data.pagination.currentPage}
          onPageChange={() => {}}
          pageSize={data.pagination.itemsPerPage}
          setPageSize={() => {}}
          totalCount={data.pagination.totalItems}
        />
      )}
    </Page>
  )
}
