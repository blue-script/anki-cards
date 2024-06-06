import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { store } from '@/app/store'

export const App = () => {
  // если скролл ест - паддинг и наоборот
  return (
    <Provider store={store}>
      <Router />
      <Toaster />
    </Provider>
  )
}
