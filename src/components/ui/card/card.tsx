import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>((props: CardProps, ref) => {
  const { className, ...rest } = props
  const classNames = clsx(s.root, className)

  return <div className={classNames} ref={ref} {...rest}></div>
})
