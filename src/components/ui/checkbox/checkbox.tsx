import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
}

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ checked, className, disabled, label, onChange }, ref) => {
    const specialTextClass = disabled ? `${s['text-disabled']}` : ''

    return (
      <div className={s.checkboxContainer}>
        <Typography
          as={'label'}
          className={`${s.label} ${specialTextClass}`}
          htmlFor={label}
          option={'body2'}
        >
          <div className={s.checkIconEffect}>
            <RadixCheckbox.Root
              checked={checked}
              className={clsx(s.checkboxRoot, { [s.disabled]: disabled }, className)}
              disabled={disabled}
              id={label}
              onCheckedChange={onChange}
              ref={ref}
            >
              <RadixCheckbox.Indicator className={s.checkboxIndicator}>
                <CheckIcon />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
          </div>
          {label}
        </Typography>
      </div>
    )
  }
)
