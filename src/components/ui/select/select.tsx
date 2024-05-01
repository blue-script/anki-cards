import { ArrowIosDownOutline } from '@/assets/icons'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import { SelectItem } from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectProps = {
  placeholder?: string
}

export const Select = ({ placeholder = 'Select-box' }: SelectProps) => (
  <RadixSelect.Root>
    <RadixSelect.Trigger aria-label={'Options'} className={s.SelectTrigger}>
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon asChild className={s.SelectIcon}>
        <ArrowIosDownOutline color={'#fff'} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal>
      <RadixSelect.Content className={'SelectContent'}>
        <RadixSelect.ScrollUpButton className={'SelectScrollButton'}>
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className={'SelectViewport'}>
          <RadixSelect.Group>
            <RadixSelect.Label className={'SelectLabel'}>Fruits</RadixSelect.Label>
            <SelectItem value={'apple'}>Apple</SelectItem>
            <SelectItem value={'banana'}>Banana</SelectItem>
            <SelectItem value={'blueberry'}>Blueberry</SelectItem>
            <SelectItem value={'grapes'}>Grapes</SelectItem>
            <SelectItem value={'pineapple'}>Pineapple</SelectItem>
          </RadixSelect.Group>

          <RadixSelect.Separator className={'SelectSeparator'} />

          <RadixSelect.Group>
            <RadixSelect.Label className={'SelectLabel'}>Vegetables</RadixSelect.Label>
            <SelectItem value={'aubergine'}>Aubergine</SelectItem>
            <SelectItem value={'broccoli'}>Broccoli</SelectItem>
            <SelectItem disabled value={'carrot'}>
              Carrot
            </SelectItem>
            <SelectItem value={'courgette'}>Courgette</SelectItem>
            <SelectItem value={'leek'}>Leek</SelectItem>
          </RadixSelect.Group>

          <RadixSelect.Separator className={'SelectSeparator'} />

          <RadixSelect.Group>
            <RadixSelect.Label className={'SelectLabel'}>Meat</RadixSelect.Label>
            <SelectItem value={'beef'}>Beef</SelectItem>
            <SelectItem value={'chicken'}>Chicken</SelectItem>
            <SelectItem value={'lamb'}>Lamb</SelectItem>
            <SelectItem value={'pork'}>Pork</SelectItem>
          </RadixSelect.Group>
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className={'SelectScrollButton'}>
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
)

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
