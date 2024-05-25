import { Card, CardsListResponse, CreateCardArgs, GetCardsArgs } from '@/services/cards/cards.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: build => {
    return {
      createCard: build.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...body }) => ({
          body: body,
          method: 'POST',
          url: `v1/decks/${id}/cards`,
        }),
      }),
      getCards: build.query<CardsListResponse, GetCardsArgs>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          method: 'GET',
          params: params ?? undefined,
          url: `v1/decks/${id}/cards`,
        }),
      }),
    }
  },
})

export const { useCreateCardMutation, useGetCardsQuery } = cardsService
