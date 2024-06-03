import { LoginArgs, User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<void, LoginArgs>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: `v1/auth/login`,
      }),
    }),
    me: build.query<User, void>({
      providesTags: ['Me'],
      query: () => `v1/auth/me`,
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authService
