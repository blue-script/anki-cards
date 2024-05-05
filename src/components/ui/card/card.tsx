import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = ComponentPropsWithoutRef<'div'>

type CardType<T extends ElementType = 'div'> = {
  as?: 'article' | 'aside' | 'div' | 'main' | 'section'
} & ComponentPropsWithoutRef<T>

const PolymorphicCard = <T extends ElementType = 'div'>(props: CardType<T>, ref: any) => {
  const { as: Component = 'div', className, ...rest } = props
  const classNames = clsx(s.root, className)

  return <Component className={classNames} ref={ref} {...rest}></Component>
}

export const Card = forwardRef(PolymorphicCard) as <T extends ElementType = 'div'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & CardProps &
    Omit<ComponentPropsWithoutRef<T>, keyof CardType<T>>
) => ReturnType<typeof PolymorphicCard>
