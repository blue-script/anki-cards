import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DeckPage } from '@/pages/deck/deckPage'
import { DecksPage } from '@/pages/decks/decksPage'
import { Decks19 } from '@/pages/decks19/decks19'
import { Learn } from '@/pages/learn/learn'
import { SignInPage } from '@/pages/signIn/signInPage'
import { Layout } from '@/shared'

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
    element: <Decks19 />,
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
    element: <Learn />,
    path: '/decks19/:deckId/learn',
  },
  {
    element: <DecksPage />,
    path: '/news',
  },
]

const PrivateRoutes = () => {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export const router = createBrowserRouter([
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
