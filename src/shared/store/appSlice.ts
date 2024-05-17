import { LoadingType } from '@/shared/store/appSlice.types'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const initialState = {
  isLoading: 'idle' as LoadingType,
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

export const appSliceName = slice.name
export const appReducer = slice.reducer
export const { selectIsLoading } = slice.selectors
// export const selectIsLoading = (state: RootState) => state.app.isLoading
