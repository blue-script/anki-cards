import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDeckArgs,
  GetDeckResponse,
  GetDecksArgs,
  LearnDeckArgs,
  RandomCardResponse,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      //createDeck: builder.mutation<Deck, CreateDeckArgs>({
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckById: builder.query<GetDeckResponse, GetDeckArgs>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getRandomCard: builder.query<RandomCardResponse, LearnDeckArgs>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...body }) => ({
          body,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetRandomCardQuery,
  useUpdateDeckMutation,
} = decksService
