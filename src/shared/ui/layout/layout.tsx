import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useOutletContext } from 'react-router-dom'

import { useMeQuery } from '@/services/auth/auth.service'
import { selectIsLoading } from '@/shared/store/appSlice'
import { LinearProgress } from '@/shared/ui'
import { Header } from '@/shared/ui/'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'>
type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(({ className, ...rest }, ref) => {
  const classes = clsx(s.layout, className)
  const isLoading = useSelector(selectIsLoading)

  const { data: meData, isError, isLoading: isMeLoading } = useMeQuery() //login
  const isAuthenticated = !isError && !isMeLoading //login -> true

  if (isMeLoading) {
    return <LinearProgress isLoading={'loading'} />
  }

  return (
    <div className={classes} ref={ref} {...rest}>
      <Header data={meData} />
      <LinearProgress isLoading={isLoading} />
      <main className={s.main}>
        <Outlet context={{ isAuthenticated } satisfies AuthContext} />
      </main>
    </div>
  )
})
