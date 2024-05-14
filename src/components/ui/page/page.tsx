import React, {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  forwardRef,
} from 'react'

import clsx from 'clsx'

import s from './page.module.scss'

type Props<T extends ElementType = 'div'> = {
  as?: T
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<T>

const PolymorphicPage = <T extends ElementType = 'div'>(
  { as, className, mt = '33px', style, ...rest }: Props<T>,
  ref: React.Ref<ElementRef<T>>
) => {
  const classes = clsx(s.page, className)
  const styles: CSSProperties = { marginTop: mt, ...style }
  const Component = (as || 'div') as ElementType

  return <Component className={classes} {...rest} ref={ref} style={styles} />
}

export const Page = forwardRef(PolymorphicPage) as <T extends ElementType = 'div'>(
  props: { ref?: React.Ref<ElementRef<T>> } & Props<T>
) => React.JSX.Element
