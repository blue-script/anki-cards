import { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons' // Added import for useState
import clsx from 'clsx'

import s from './checkbox.module.scss'

export const CheckboxR = () => {
  const [selected, setSelected] = useState<boolean>(false) // Ensure correct generic type for TypeScript

  const checkboxHandler = () => {
    setSelected(!selected)
  }

  return (
    <Checkbox.Root
      className={clsx(s.CheckboxRoot, { [s.selected]: selected })} // Corrected conditional class syntax
      onCheckedChange={checkboxHandler}
    >
      <Checkbox.Indicator className={s.CheckboxIndicator}>
        <CheckIcon className={s.CheckIcon} /> // Ensure the class name matches what's defined in
        your CSS module
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
