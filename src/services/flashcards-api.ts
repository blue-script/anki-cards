//                                                          check HERE /react
import { DecksListResponse, GetDecksArgs } from '@/services/decks/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v2/decks`,
          //url for error => url: `v2/decks/x1`,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const { useGetDecksQuery } = flashcardsApi
