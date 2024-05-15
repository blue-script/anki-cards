import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Header } from '@/shared/ui/header/header'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = {
  contentMarginTop?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, contentMarginTop = '36px', ...rest }, ref) => {
    const classes = clsx(s.layout)

    return (
      <div className={classes} ref={ref} {...rest}>
        <Header />
        <main className={s.main}>{children}</main>
      </div>
    )
  }
)
