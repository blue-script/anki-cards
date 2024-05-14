import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'

export const App = () => {
  return (
    // wrap router with Provider store => added rtk
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
