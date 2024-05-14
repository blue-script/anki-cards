import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CardsPage } from '@/pages/cards/cardsPage'
import { DecksPage } from '@/pages/decks/decksPage'

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
  {
    element: <DecksPage />,
    path: '/',
  },
  {
    element: <CardsPage />,
    path: '/decks/:id',
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
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    element: <h1>404</h1>,
    path: '*',
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}
