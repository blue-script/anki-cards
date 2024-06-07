import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DeckPage } from '@/pages/deck/deckPage'
import { DecksPage } from '@/pages/decksPage/decksPage'
import { Learn } from '@/pages/learn/learn'
import { SignInPage } from '@/pages/signInPage'
import { Layout } from '@/shared'
import { useAuthContext } from '@/shared/ui/layout/layout'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate replace to={'/decks'} />,
    path: '/',
  },
  {
    element: <DecksPage />,
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
    element: <Learn />,
    path: '/decksPage/:deckId/learn',
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
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

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
