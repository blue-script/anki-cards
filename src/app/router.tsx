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
  return (
    //<AuthProvider>
    <RouterProvider router={router} />
    //</AuthProvider>
  )
}

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  //console.log('PrivateRoutes isAuthenticated:', isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

//////////////////////////////////////////////////////////////////////////////////
// import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
//
// import { useMeQuery } from '@/services/auth/auth.service'
//
// interface AuthContextType {
//   isAuthenticated: boolean
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined)
//
// interface AuthProviderProps {
//   children: ReactNode
// }
//
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const { data, error } = useMeQuery()
//
//   useEffect(() => {
//     if (data) {
//       setIsAuthenticated(!!data)
//     } else if (error) {
//       setIsAuthenticated(false)
//     }
//   }, [data, error])
//
//   return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
// }
//
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext)
//
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//
//   return context
// }
