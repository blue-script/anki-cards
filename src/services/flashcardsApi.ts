import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')

      if (headers.get('Authorization')) {
        return headers
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 20,
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
})
