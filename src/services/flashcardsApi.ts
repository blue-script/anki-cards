import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'https://api.flashcards.andrii.es',
      // credentials: 'include',
      // prepareHeaders: headers => {
      //   headers.append('x-auth-skip', 'true')
      // },
    })
    // { maxRetries: 3 }
  ),
  endpoints: () => ({}),
  keepUnusedDataFor: 1,
  reducerPath: 'flashcardsApi',
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  tagTypes: ['Decks', 'Cards', 'Me'],
})
