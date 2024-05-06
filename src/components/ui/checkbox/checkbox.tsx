import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  className?: string
  disabled?: boolean
  id?: string
  isChecked?: boolean
  label?: string
  onChange?: (isChecked: boolean) => void
}

export const Checkbox = forwardRef<ElementRef<'form'>, CheckboxProps>(
  ({ disabled = false, isChecked = false, label, onChange }, ref) => {
    return (
      <form className={s.wrapper} ref={ref}>
        <RadixCheckbox.Root
          checked={isChecked}
          className={clsx(s.CheckboxRoot, { [s.selected]: isChecked }, { [s.disabled]: disabled })}
          disabled={disabled}
          onCheckedChange={onChange}
        >
          <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
            <CheckIcon className={s.CheckIcon} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography
            as={'p'}
            className={s.marginLeft}
            color={'light'}
            disabled={disabled}
            option={'body2'}
          >
            {label}
          </Typography>
        )}
      </form>
    )
  }
)
