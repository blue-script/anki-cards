import { useState } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons' // Added import for useState
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  label?: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked = false, disabled = false, label } = props
  const [selected, setSelected] = useState<boolean>(false) // Ensure correct generic type for TypeScript

  const checkboxHandler = () => {
    if (!disabled) {
      setSelected(!selected)
    }
  }

  return (
    <form className={s.wrapper}>
      <RadixCheckbox.Root
        checked={checked}
        className={clsx(s.CheckboxRoot, { [s.selected]: selected }, { [s.disabled]: disabled })}
        disabled={disabled}
        onCheckedChange={checkboxHandler}
      >
        <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
          <CheckIcon className={s.CheckIcon} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Typography as={'p'} className={s.label} color={'light'} option={'body2'}>
          {label}
        </Typography>
      )}
    </form>
  )
}
