import {
  Card,
  CardsListResponse,
  CreateCardArgs,
  GetCardsArgs,
  UpdateCardArgs,
} from '@/services/cards/cards.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: build => {
    return {
      createCard: build.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ data, deckId }) => {
          return {
            body: data,
            method: 'POST',
            url: `v1/decks/${deckId}/cards`,
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
      updateCard: build.mutation<Card, UpdateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ cardId, data }) => ({
          body: data,
          method: 'PATCH',
          url: `v1/cards/${cardId}`,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsService
