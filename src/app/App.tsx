import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { store } from '@/app/store'

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
