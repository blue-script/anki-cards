import * as RadioGr from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radioGroup.module.scss'

export type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  disabled?: boolean
  errorMessage?: string
  name?: string
  onValueChange?: (value: string) => void
  options: Option[]
  value?: string
}

export const RadioGroup = ({ errorMessage, onValueChange, options, ...rest }: RadioGroupProps) => {
  const labelClasses = clsx(s.item, rest.disabled && s.disabled)

  return (
    <RadioGr.Root
      aria-label={'Aria label'}
      onValueChange={onValueChange}
      {...rest}
      className={s.root}
    >
      {options.map(el => (
        <label className={labelClasses} key={el.value}>
          <RadioGr.Item className={s.radio} value={el.value}>
            <div className={s.frame}></div>
            <RadioGr.Indicator className={s.indicator} />
          </RadioGr.Item>
          {el.label}
        </label>
      ))}
      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </RadioGr.Root>
  )
}
