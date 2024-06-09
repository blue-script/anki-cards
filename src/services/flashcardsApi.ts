import { baseQueryWithReauth } from '@/services/flashCardsBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  // baseQuery: baseQueryWithReauth,
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
    },
    // credentials: 'include',
    // prepareHeaders: headers => {
    //   headers.append('x-auth-skip', 'true')
    // },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 1,
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
})
