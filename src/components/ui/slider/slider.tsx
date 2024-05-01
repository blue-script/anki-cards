import { ComponentProps, ElementRef, forwardRef } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

type Props = ComponentProps<typeof SliderPrimitive.Root>

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, Props>((props, ref) => {
  const { className, max, min, onValueChange, value, ...rest } = props

  const value1 = value?.[0] ?? 0
  const value2 = value?.[1] ?? max ?? 0

  return (
    <div className={s.container}>
      <span className={s.values}>{value1}</span>
      <SliderPrimitive.Root
        className={clsx(s.root, className)}
        max={max ?? 10}
        min={min ?? 0}
        onValueChange={onValueChange}
        ref={ref}
        value={[value1, value2]}
        {...rest}
      >
        <SliderPrimitive.Track className={s.track}>
          <SliderPrimitive.Range className={s.range} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb aria-label={'Volume'} className={s.thumb} />
        <SliderPrimitive.Thumb aria-label={'Volume'} className={s.thumb} />
      </SliderPrimitive.Root>
      <span className={s.values}>{value2}</span>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName
