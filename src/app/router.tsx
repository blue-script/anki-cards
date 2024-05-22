import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DeckPage } from '@/pages/deck/deckPage'
import { DecksList } from '@/pages/decks/decksList/decksList'
import { Layout } from '@/shared'

const publicRoutes: RouteObject[] = [
  {
    element: <div>inside publicRoutes / login</div>,
    path: '/login',
  },
  {
    element: <div>inside publicRoutes / logout</div>,
    path: '/logout',
  },
]

const privateRoutes: RouteObject[] = [
  // {
  //   element: <DecksPage />,
  //   index: true,
  //   path: '/decks',
  // },
  {
    element: <DecksList />,
    index: true,
    path: '/decks',
  },
  {
    element: <DeckPage />,
    path: '/decks/:deckId',
  },
  {
    element: <div>inside privateRoutes / News Here</div>,
    path: '/news',
  },
]

const PrivateRoutes = () => {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Navigate replace to={'/decks'} />,
        index: true,
      },
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    errorElement: <div>Error Page Placeholder</div>,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
