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
            console.warn(e)
          }
        },
        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          formData.append('name', name)
          if (isPrivate) {
            formData.append('isPrivate', String(isPrivate))
          }
          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks`,
          }
        },
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
        async onQueryStarted({ cover, deckId, ...args }, { dispatch, getState, queryFulfilled }) {
          const patchResult: any[] = []

          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === deckId)

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
            patchResult.forEach(patchResult => {
              patchResult.undo()
            })
          }
        },
        query: ({ deckId, ...body }) => {
          const formData = new FormData()

          if (body.cover) {
            formData.append('cover', body.cover)
          } else if (body.cover === null) {
            formData.append('cover', '')
          }
          if (body.name) {
            formData.append('name', body.name)
          }
          if (body.isPrivate) {
            formData.append('isPrivate', String(body.isPrivate))
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${deckId}`,
          }
        },
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
