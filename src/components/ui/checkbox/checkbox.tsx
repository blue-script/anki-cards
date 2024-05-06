import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
}

export const Checkbox = ({ checked, className, disabled, id, label, onChange }: CheckboxProps) => {
  const specialTextClass = disabled ? `${s['text-disabled']}` : ''

  return (
    <form style={{ padding: '10px' }}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <RadixCheckbox.Root
          checked={checked}
          className={clsx(s.CheckboxRoot, { [s.disabled]: disabled }, className)}
          disabled={disabled}
          id={id}
          onCheckedChange={onChange}
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
    </form>
  )
}
