import React, { ReactNode, createContext, useContext, useEffect } from 'react'

import { useMeQuery } from '@/services/auth/auth.service'

interface AuthContextType {
  isAuthenticated: boolean
  isError: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuthenticated = !!data

  useEffect(() => {
    console.log('useMeQuery data:', data)
    console.log('isAuthenticated:', isAuthenticated)
  }, [data, isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isError, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
