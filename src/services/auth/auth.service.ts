import { User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    // login: builder.mutation<void, LoginArgs>({
    //   invalidatesTags: ['Me'],
    //   query: body => ({
    //     body,
    //     method: 'POST',
    //     url: `v1/auth/login`,
    //   }),
    // }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => 'v1/auth/me',
    }),
  }),
})

export const { useMeQuery } = authService
