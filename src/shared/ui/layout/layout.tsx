import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/shared/ui/header/header'
import LinearProgress from '@/shared/ui/lineProgress/linearProgress'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = {
  contentMarginTop?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ className, contentMarginTop = '36px', ...rest }, ref) => {
    const classes = clsx(s.layout)

    return (
      <div className={classes} ref={ref} {...rest}>
        <Header />
        <LinearProgress />
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    )
  }
)
