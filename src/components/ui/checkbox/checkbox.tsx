import { ElementRef, forwardRef, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  disabled?: boolean
  label?: string
}

export const Checkbox = forwardRef<ElementRef<'form'>, CheckboxProps>(
  ({ disabled = false, label }, ref) => {
    const [isSelected, setIsSelected] = useState<boolean>(true)

    const checkboxHandler = () => {
      if (!disabled) {
        setIsSelected(!isSelected)
      }
    }

    return (
      <form className={s.wrapper} ref={ref}>
        <RadixCheckbox.Root
          checked={isSelected}
          className={clsx(s.CheckboxRoot, { [s.selected]: isSelected }, { [s.disabled]: disabled })}
          disabled={disabled}
          onCheckedChange={checkboxHandler}
        >
          <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
            <CheckIcon className={s.CheckIcon} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography as={'p'} className={s.marginLeft} color={'light'} option={'body2'}>
            {label}
          </Typography>
        )}
      </form>
    )
  }
)
