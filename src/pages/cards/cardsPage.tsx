import { useParams } from 'react-router-dom'

import { CardsTable } from '@/entities/cards'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { Layout, Page } from '@/shared'

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

  return (
    <Layout>
      <Page>
        <CardsTable cards={data?.items} onDeleteClick={() => {}} onEditClick={() => {}} />
      </Page>
    </Layout>
  )
}
