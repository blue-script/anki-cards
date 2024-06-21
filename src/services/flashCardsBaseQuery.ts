import { router } from '@/app/router'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { z } from 'zod'

const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
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
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result: any

  try {
    result = await baseQuery(args, api, extraOptions)
  } catch (error) {
    result = { error }
  }

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              method: 'POST',
              url: '/v2/auth/refresh-token',
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const refreshResultParsed = refreshTokenResponseSchema.parse(refreshResult.data)

            localStorage.setItem('accessToken', refreshResultParsed.accessToken.trim())
            localStorage.setItem('refreshToken', refreshResultParsed.refreshToken.trim())

            // Retry the initial query with the new token
            result = await baseQuery(args, api, extraOptions)
          } else {
            // If refresh failed, navigate to login
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            await router.navigate('/login')
          }
        } else {
          // No refresh token available, navigate to login
          await router.navigate('/login')
        }
      } catch (error) {
        // Suppress error logging
        result = { error }
        await router.navigate('/login')
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      try {
        result = await baseQuery(args, api, extraOptions)
      } catch (error) {
        result = { error }
      }
    }
  }

  if (result.error) {
    return { error: result.error }
  }

  return { data: result.data }
}
