import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const initialState = {
  isLoading: 'idle' as RequestStatusType,
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.isLoading = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.isLoading = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.isLoading = 'failed'
      })
  },
  initialState,
  name: 'app',
  reducers: {},
  selectors: {
    selectIsLoading: sliceState => sliceState.isLoading,
  },
})

export const appReducer = slice.actions
export const { selectIsLoading } = slice.selectors
