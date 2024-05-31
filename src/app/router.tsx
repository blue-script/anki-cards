import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DeckPage } from '@/pages/deck/deckPage'
import { DecksList } from '@/pages/decks/decksList/decksList'
import { DecksPage } from '@/pages/decks/decksPage'
import { Decks19 } from '@/pages/decks19/decks19'
import { Learn } from '@/pages/learn/learn'
import { SignInPage } from '@/pages/signInPage'
import { Layout } from '@/shared'
import { useAuthContext } from '@/shared/ui/layout/layout'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <div>inside publicRoutes / logout</div>,
    path: '/logout',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate replace to={'/decks'} />,
    path: '/',
  },
  {
    element: <DecksList />,
    path: '/decks',
  },
  {
    element: <DeckPage />,
    path: '/decks/:deckId',
  },
  {
    element: <Learn />,
    path: '/decks/:deckId/learn',
  },
  {
    element: <Decks19 />,
    path: '/decks19',
  },
  {
    element: <DecksPage />,
    path: '/news',
  },
]

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        element: <h1>404</h1>,
        path: '*',
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
