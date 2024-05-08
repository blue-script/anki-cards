import { ElementRef, forwardRef } from 'react'

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
  ({ checked, className, disabled, id, label, onChange }, ref) => {
    const specialTextClass = disabled ? `${s['text-disabled']}` : ''

    return (
      <div style={{ alignItems: 'center', display: 'flex', margin: '10px 2px' }}>
        <RadixCheckbox.Root
          checked={checked}
          className={clsx(s.CheckboxRoot, { [s.disabled]: disabled }, className)}
          disabled={disabled}
          id={id}
          onCheckedChange={onChange}
          ref={ref}
        >
          <RadixCheckbox.Indicator className={`${s.CheckboxIndicator}`}>
            <CheckIcon className={`${s.CheckIcon}`} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className={`${s.Label} ${specialTextClass}`} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    )
  }
)
