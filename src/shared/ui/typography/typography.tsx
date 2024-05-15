import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './typography.module.scss'

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
  disabled?: boolean
  option: OptionType
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { as: Component = 'p', className, disabled, option = 'body1', ...rest } = props

  return (
    <Component
      className={clsx(s['light'], { [s.disabled]: disabled }, [s[option], className])}
      {...rest}
    />
  )
}
