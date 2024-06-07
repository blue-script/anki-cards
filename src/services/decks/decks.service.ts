import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDeckArgs,
  GetDeckResponse,
  GetDecksArgs,
  GetMinMaxCardsResponse,
  LearnDeckArgs,
  RandomCardResponse,
  UpdateDeckArgs,
  UpdateGradeArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcardsApi'
import { current } from '@reduxjs/toolkit'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  if (originalArgs.currentPage !== 1) {
                    return
                  }
                  draft.items.unshift(data)
                  draft.items.pop()
                })
              )
            })
          } catch (e) {
            console.log(e)
          }
        },
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
      getMinMaxCards: builder.query<GetMinMaxCardsResponse, void>({
        query: () => 'v2/decks/min-max-cards',
      }),
      learnRandomCard: builder.query<RandomCardResponse, LearnDeckArgs>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id, ...args }, { dispatch, getState, queryFulfilled }) {
          const patchResult: any[] = []

          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  console.log(current(draft))

                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  console.log(itemToUpdateIndex)

                  if (itemToUpdateIndex === -1) {
                    return
                  }

                  Object.assign(draft.items[itemToUpdateIndex], args)
                })
              )
            )
          })

          console.log('invalidateBy', invalidateBy)

          try {
            await queryFulfilled
          } catch (e) {
            patchResult.forEach(patchResult => {
              patchResult.undo()
            })
          }
        },
        query: ({ id, ...body }) => ({
          body,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
      updateRandomCard: builder.mutation<RandomCardResponse, UpdateGradeArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...body }) => ({
          body,
          method: 'POST',
          url: `v1/decks/${id}/learn`,
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
  useGetMinMaxCardsQuery,
  useLazyGetDecksQuery,
  useLearnRandomCardQuery,
  useUpdateDeckMutation,
  useUpdateRandomCardMutation,
} = decksService
