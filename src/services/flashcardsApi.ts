import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'https://api.flashcards.andrii.es',
    }),
    { maxRetries: 0 }
  ),
  endpoints: () => ({}),
  keepUnusedDataFor: 1,
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
})
