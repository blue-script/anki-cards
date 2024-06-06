import { LoginArgs, LoginResponse, User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken.trim())
        localStorage.setItem('refreshToken', data.refreshToken.trim())

        dispatch(authService.util.invalidateTags(['Me']))
      },
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
