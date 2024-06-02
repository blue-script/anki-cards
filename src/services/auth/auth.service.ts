import { LoginArgs, LoginResponse, User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'],
      //async onQueryStarted(arg: LoginArgs, { queryFulfilled }) {
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken.trim())
        localStorage.setItem('refreshToken', data.refreshToken.trim())
      },
      query: body => ({
        body,
        method: 'POST',
        url: `v1/auth/login`,
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => 'v1/auth/me',
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authService
