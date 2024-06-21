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
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), [
            { type: 'Cards' },
          ])

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
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
        query: ({ data, deckId }) => {
          const formData = new FormData()

          formData.append('answer', data.answer)
          formData.append('question', data.question)
          if (data.questionImg) {
            formData.append('questionImg', data.questionImg)
          }
          if (data.answerImg) {
            formData.append('answerImg', data.answerImg)
          }

          return {
            body: formData,
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
        // async onQueryStarted({ cardId, ...args }, { dispatch, getState, queryFulfilled }) {
        //   const patchResult: any[] = []
        //
        //   const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), [
        //     { type: 'Cards' },
        //   ])
        //
        //   invalidateBy.forEach(({ originalArgs }) => {
        //     patchResult.push(
        //       dispatch(
        //         cardsService.util.updateQueryData('getCards', originalArgs, draft => {
        //           const itemToUpdateIndex = draft.items.findIndex(card => card.id === cardId)
        //
        //           if (itemToUpdateIndex === -1) {
        //             return
        //           }
        //
        //           Object.assign(draft.items[itemToUpdateIndex], args)
        //         })
        //       )
        //     )
        //   })
        //   try {
        //     await queryFulfilled
        //   } catch (e) {
        //     patchResult.forEach(patchResult => {
        //       patchResult.undo()
        //     })
        //   }
        // },
        query: ({ cardId, data }) => {
          const formData = new FormData()

          formData.append('answer', data.answer)
          formData.append('question', data.question)
          if (data.questionImg instanceof File) {
            formData.append('questionImg', data.questionImg)
            console.log('here')
            console.log(formData.get('questionImg'))
          } else if (data.questionImg === null) {
            formData.append('questionImg', '')
          }
          if (data.answerImg instanceof File) {
            formData.append('answerImg', data.answerImg)
          } else if (data.answerImg === null) {
            formData.append('answerImg', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/cards/${cardId}`,
          }
        },
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
