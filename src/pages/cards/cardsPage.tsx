import { useParams } from 'react-router-dom'

import { CardsTable } from '@/entities/cards'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { Dropdown, Layout, Page, TextField, Typography } from '@/shared'

export const CardsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useGetCardsQuery({ id: id ?? '' }, { skip: !id })

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
      <Page>
        <Typography option={'h1'}>{isOwner ? 'My Deck' : 'Friend’s Deck'}</Typography>
        <Dropdown.Root></Dropdown.Root>
        <TextField fullWidth variant={'search'}></TextField>
        <CardsTable cards={data?.items} onDeleteClick={() => {}} onEditClick={() => {}} />
      </Page>
    </Layout>
  )
}
