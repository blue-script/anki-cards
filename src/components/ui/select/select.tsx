import { useState } from 'react'

import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons'
import { Typography } from '@/components/ui/typography'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectItem } from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type SelectProps = {
  disabled?: boolean
  placeholder?: string
}

const availableOptions = ['apple', 'banana', 'blueberry', 'grapes', 'pineapple']

export const Select = ({ disabled = false, placeholder = 'Select-box' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const iconColor = disabled ? '#4c4c4c' : '#fff'

  return (
    <RadixSelect.Root disabled={disabled} onOpenChange={setIsOpen}>
      <div className={s.SelectWrapper}>
        <Typography
          className={clsx(s.SelectTypo, { [s.disabled]: disabled })}
          color={'light'}
          option={'body2'}
        >
          {placeholder}
        </Typography>
        <RadixSelect.Trigger
          aria-label={'Options'}
          className={clsx(s.SelectTrigger, { [s.disabled]: disabled })}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild className={s.SelectIcon}>
            {isOpen ? <ArrowIosUp color={iconColor} /> : <ArrowIosDownOutline color={iconColor} />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.SelectContent}>
            <RadixSelect.Viewport>
              <RadixSelect.Group className={s.SelectGroup}>
                {availableOptions.map(option => (
                  <SelectItem className={s.SelectItem} key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </div>
    </RadixSelect.Root>
  )
}
