import { useState } from 'react'

import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons'
import { Typography } from '@/components/ui/typography'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectItem } from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectProps = {
  placeholder?: string
}

export const Select = ({ placeholder = 'Select-box' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <RadixSelect.Root onOpenChange={setIsOpen}>
      <div className={s.SelectWrapper}>
        <Typography className={s.SelectTypo} color={'light'} option={'body2'}>
          {placeholder}
        </Typography>
        <RadixSelect.Trigger aria-label={'Options'} className={s.SelectTrigger}>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild className={s.SelectIcon}>
            {isOpen ? <ArrowIosUp color={'#fff'} /> : <ArrowIosDownOutline color={'#fff'} />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.SelectContent}>
            <RadixSelect.Viewport className={'SelectViewport'}>
              <RadixSelect.Group style={{ width: '210px' }}>
                <SelectItem className={s.SelectItem} value={'apple'}>
                  Apple
                </SelectItem>
                <SelectItem className={s.SelectItem} value={'banana'}>
                  Banana
                </SelectItem>
                <SelectItem className={s.SelectItem} value={'blueberry'}>
                  Blueberry
                </SelectItem>
                <SelectItem className={s.SelectItem} value={'grapes'}>
                  Grapes
                </SelectItem>
                <SelectItem className={s.SelectItem} value={'pineapple'}>
                  Pineapple
                </SelectItem>
              </RadixSelect.Group>
              <RadixSelect.Separator className={'SelectSeparator'} />
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className={'SelectScrollButton'}>
              <ChevronDownIcon />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </div>
    </RadixSelect.Root>
  )
}

// const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
//   return (
//     <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
//       <Select.ItemText>{children}</Select.ItemText>
//       <Select.ItemIndicator className={'SelectItemIndicator'}>
//         <CheckIcon />
//       </Select.ItemIndicator>
//     </Select.Item>
//   )
// })
