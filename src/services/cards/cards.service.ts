import { flashcardsApi } from '@/services/flashcardsApi'

export const cardsService = flashcardsApi.injectEndpoints({
  endpoints: build => {
    return {
      getCards: build.query<any, any>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          method: 'GET',
          params: params ?? undefined,
          url: `v1/cards/${id}`,
        }),
      }),
    }
  },
})
