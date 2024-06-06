import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDeckArgs,
  GetDeckResponse,
  GetDecksArgs,
  LearnDeckArgs,
  PatchResult,
  RandomCardResponse,
  UpdateDeckArgs,
  UpdateGradeArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcardsApi'

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
      learnRandomCard: builder.query<RandomCardResponse, LearnDeckArgs>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])

          const patchResults: PatchResult[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }

                  Object.assign(draft.items[itemToUpdateIndex], args)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
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
  useLearnRandomCardQuery,
  useUpdateDeckMutation,
  useUpdateRandomCardMutation,
} = decksService
