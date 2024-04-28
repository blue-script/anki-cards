import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './Typography.module.scss'

export const availableOptions = [
  'body1',
  'body2',
  'subtitle1',
  'subtitle2',
  'h1',
  'h2',
  'h3',
  'h4',
  'link1',
  'link2',
  'caption',
  'subtitle',
] as const

export type OptionType = (typeof availableOptions)[number]

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  className?: string
  color: 'dark' | 'light'
  option: OptionType
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { as: Component = 'p', className, color = 'light', option = 'body1', ...rest } = props

  const colorClass = s[color] || ''
  const optionClass = s[option] || ''

  return <Component className={clsx(colorClass, optionClass, className)} {...rest} />
}
