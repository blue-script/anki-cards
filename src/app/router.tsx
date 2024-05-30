import { useState } from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { LoginForm } from '@/features/auth/loginForm/loginForm'
import { DeckPage } from '@/pages/deck/deckPage'
import { DecksList } from '@/pages/decks/decksList/decksList'
import { DecksPage } from '@/pages/decks/decksPage'
import { Decks19 } from '@/pages/decks19/decks19'
import { Learn } from '@/pages/learn/learn'
import { useMeQuery } from '@/services/auth/auth.service'
import { Layout } from '@/shared'

const handleSubmit = (data: any) => {
  console.log(data)
}

const publicRoutes: RouteObject[] = [
  {
    element: <LoginForm onSubmit={handleSubmit} />,
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { data: authMeData, isLoading: isLoadingMe } = useMeQuery()

  console.log(authMeData)

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
