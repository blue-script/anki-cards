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

import { Layout } from '@/components/ui/layout/layout'
import { DecksPage } from '@/pages/decks.page'

const publicRoutes: RouteObject[] = [
  {
    element: <div>inside publicRoutes / login</div>,
    path: '/login',
  },
  // delete after practise
  {
    element: <div>inside publicRoutes / logout</div>,
    path: '/logout',
  },
]

const privateRoutes: RouteObject[] = [
  {
    // element: <div>inside privateRoutes / mainPage</div>,
    // path: '/',
    element: <DecksPage />,
    path: '/',
  },
  // delete after some time
  {
    element: <div>inside privateRoutes / Cards Here</div>,
    path: '/cards',
  },
  // delete after some time
  {
    element: <div>inside privateRoutes / News Here</div>,
    path: '/news',
  },
  {
    element: <Layout />,
    path: 'layout',
  },
]

// wrap component
const PrivateRoutes = () => {
  const isAuthenticated = true

  //                  outlet => privateRoutes
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

// const Container = () => {
//   return (
//     <div>
//       <div>Welcome in :</div>
//       {/*required component*/}
//       <Outlet />
//     </div>
//   )
// }

// const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    element: <h1>404</h1>,
    path: '*',
  },
  // {
  //   children: privateRoutes,
  //   element: <Container />,
  // },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}
