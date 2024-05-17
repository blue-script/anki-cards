import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { LinearProgress } from '@/shared/ui'
import { Header } from '@/shared/ui/'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(({ className, ...rest }, ref) => {
  const classes = clsx(s.layout, className)

  // why error?
  const isLoading = 'loading' // useSelector(selectIsLoading)

  return (
    <div className={classes} ref={ref} {...rest}>
      <Header />
      <LinearProgress isLoading={isLoading} />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
})
