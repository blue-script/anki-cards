// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//
// const router = createBrowserRouter([
//   {
//     element: <div>Inside router with help of createBrowserRouter</div>,
//     path: '/',
//   },
// ])
//
// export const Router = () => {
//   return <RouterProvider router={router} />
// }

/////////////////////////////////////////////////////////////////

import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksPage } from '@/pages/decks.page'

const publicRoutes: RouteObject[] = [
  {
    element: <div>inside publicRoutes / login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    // element: <div>inside privateRoutes / mainPage</div>,
    // path: '/',
    element: <DecksPage />,
    path: '/',
  },
]

// wrap component
const PrivateRoutes = () => {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

// const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}
