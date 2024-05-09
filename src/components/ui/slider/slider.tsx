import { ComponentProps, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components'
import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

type Props = {
  label: string
} & ComponentProps<typeof SliderPrimitive.Root>

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, Props>((props, ref) => {
  const { className, label, max, min, onValueChange, value, ...rest } = props

  const value1 = Math.max(value?.[0] ?? 0, min ?? 0)
  const value2 = Math.min(value?.[1] ?? max ?? 10, max ?? 10)

  return (
    <div className={s.wrapper}>
      <Typography as={'span'} color={'light'} option={'body2'}>
        {label}
      </Typography>
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
          <SliderPrimitive.Thumb aria-label={'range-first-thumb'} className={s.thumb} />
          <SliderPrimitive.Thumb aria-label={'range-second-thumb'} className={s.thumb} />
        </SliderPrimitive.Root>
        <span className={s.values}>{value2}</span>
      </div>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName
