import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

import SvgLayers from '@/assets/icons/Layers'
import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  icon?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref: any
) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    icon,
    variant = 'primary',
    ...rest
  } = props

  const finalClassName = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)
  const color = variant === 'tertiary' ? '#8C61FF' : '#FFFFFF'

  return (
    <Component className={finalClassName} {...rest} ref={ref}>
      {icon && (
        <span className={s.icon}>
          <SvgLayers color={color} />
        </span>
      )}
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => ReturnType<typeof ButtonPolymorph>
