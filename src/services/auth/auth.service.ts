import {
  LoginArgs,
  LoginResponse,
  LogoutResponse,
  UpdateMeArgs,
  User,
} from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcardsApi'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
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
    logout: builder.mutation<LogoutResponse, void>({
      async onQueryStarted(_, { dispatch }) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        dispatch(authService.util.invalidateTags(['Me']))
      },
      query: () => ({ method: 'POST', url: 'v2/auth/logout' }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => ({ method: 'GET', url: 'v1/auth/me' }),
    }),
    meEdit: builder.mutation<User, UpdateMeArgs>({
      invalidatesTags: ['Me'],
      query: body => {
        const formData = new FormData()

        if (body.name) {
          formData.append('name', body.name)
        }

        if (body.avatar) {
          formData.append('avatar', body.avatar)
        }

        return {
          body: formData,
          method: 'PATCH',
          url: 'v1/auth/me',
        }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeEditMutation, useMeQuery } = authService
