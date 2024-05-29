import { Card, CardsListResponse, GetCardsArgs } from '@/services/cards/cards.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: build => {
    return {
      createCard: build.mutation<Card, any>({
        invalidatesTags: ['Cards'],
        query: ({ data, id }) => {
          return {
            body: data,
            method: 'POST',
            url: `v1/decks/${id}/cards`,
          }
        },
      }),
      deleteCard: build.mutation<null, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
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

export const { useCreateCardMutation, useDeleteCardMutation, useGetCardsQuery } = cardsService
