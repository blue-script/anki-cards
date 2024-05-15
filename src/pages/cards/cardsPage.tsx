import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import deckImg from '@/assets/img/mask.png'
import { CardsTable } from '@/entities/cards'
import { DropDownDeck } from '@/entities/dropDownDeck/dropDownDeck'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { Button, Dropdown, FormTextField, Layout, Page, Pagination, Typography } from '@/shared'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useGetCardsQuery({ id: id ?? '' }, { skip: !id })

  const { control, handleSubmit } = useForm({})

  if (!id) {
    return <div>Invalid card ID</div>
  }

  if (isLoading) {
    return <div>LOADING...</div>
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>
  }

  const isOwner = true //some logic

  return (
    <Layout>
      <Page mt={'24px'}>
        <Button className={s.buttonBack}>
          <ArrowBackOutline /> <Typography option={'body2'}>Back to Decks List</Typography>
        </Button>

        <div className={s.ownerAndLearn}>
          <div>
            <Typography option={'h1'}>{isOwner ? 'My Deck' : 'Friend’s Deck'}</Typography>
            <DropDownDeck />
          </div>

          <Button>Learn to Deck</Button>
        </div>
        <img alt={'deck-img'} className={s.image} src={deckImg} />
        {isOwner && <Dropdown.Root></Dropdown.Root>}

        <form onSubmit={handleSubmit(() => {})}>
          <FormTextField
            control={control}
            fullWidth
            label={'search cards'}
            name={'searchCards'}
            variant={'search'}
          />
        </form>
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
    </Layout>
  )
}
