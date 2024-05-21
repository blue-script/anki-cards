import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { selectIsLoading } from '@/shared/store/appSlice'
import { LinearProgress } from '@/shared/ui'
import { Header } from '@/shared/ui/'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(({ className, ...rest }, ref) => {
  const classes = clsx(s.layout, className)
  const isLoading = useSelector(selectIsLoading)

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
