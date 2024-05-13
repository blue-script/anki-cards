import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './page.module.scss'
// заполиморфить
type Props = {
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Page = forwardRef<ElementRef<'div'>, Props>(
  ({ className, mt = '33px', style, ...rest }, ref) => {
    const classes = clsx(s.page, className)
    const styles: CSSProperties = { marginTop: mt, ...style }

    return <div className={classes} {...rest} ref={ref} style={styles} />
  }
)
