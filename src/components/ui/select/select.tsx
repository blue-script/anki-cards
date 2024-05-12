import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons'
import { Option } from '@/components/ui/select/select.stories'
import { Typography } from '@/components/ui/typography'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  onValueChange?: (value: string) => void
  options: Option[]
  placeholder?: string
  required?: boolean
  small?: boolean
  value?: string
}

const SelectRoot = (props: ComponentPropsWithoutRef<typeof RadixSelect.Root>) => (
  <RadixSelect.Root {...props} />
)

const SelectTrigger = forwardRef<
  ElementRef<typeof RadixSelect.Trigger>,
  ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>((props, ref) => <RadixSelect.Trigger {...props} ref={ref} />)

const SelectPortal = (props: ComponentPropsWithoutRef<typeof RadixSelect.Portal>) => (
  <RadixSelect.Portal {...props} />
)

const SelectContent = forwardRef<
  ElementRef<typeof RadixSelect.Content>,
  ComponentPropsWithoutRef<typeof RadixSelect.Content>
>((props, ref) => <RadixSelect.Content {...props} ref={ref} />)

const SelectViewport = forwardRef<
  ElementRef<typeof RadixSelect.Viewport>,
  ComponentPropsWithoutRef<typeof RadixSelect.Viewport>
>((props, ref) => <RadixSelect.Viewport {...props} ref={ref} />)

const SelectGroup = forwardRef<
  ElementRef<typeof RadixSelect.Group>,
  ComponentPropsWithoutRef<typeof RadixSelect.Group>
>((props, ref) => <RadixSelect.Group {...props} ref={ref} />)

const SelectValue = forwardRef<
  ElementRef<typeof RadixSelect.Value>,
  ComponentPropsWithoutRef<typeof RadixSelect.Value>
>((props, ref) => <RadixSelect.Value {...props} ref={ref} />)

const SelectIcon = forwardRef<
  ElementRef<typeof RadixSelect.Icon>,
  ComponentPropsWithoutRef<typeof RadixSelect.Icon>
>((props, ref) => <RadixSelect.Icon {...props} ref={ref} />)

export const Select = ({
  defaultValue,
  disabled = false,
  label,
  onValueChange,
  options,
  placeholder = 'select-item',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const iconColor = disabled ? '#4c4c4c' : '#fff'
  const longestOptionLength = Math.max(...options.map(option => option.length))
  const dynamicWidth = longestOptionLength <= 3 ? '50px' : '120px'

  return (
    <SelectRoot
      defaultValue={defaultValue}
      disabled={disabled}
      onOpenChange={setIsOpen}
      onValueChange={onValueChange}
    >
      <div className={s.selectWrapper}>
        <Typography className={clsx(s.selectTypo)} disabled={disabled} option={'body2'}>
          {label}
        </Typography>
        <SelectTrigger
          aria-label={'Options'}
          className={clsx(s.selectTrigger, { [s.disabled]: disabled })}
          style={{ width: dynamicWidth }}
        >
          <SelectValue placeholder={`${placeholder}`} />
          <SelectIcon asChild className={s.selectIcon}>
            {isOpen ? <ArrowIosUp color={iconColor} /> : <ArrowIosDownOutline color={iconColor} />}
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent
            className={s.selectContent}
            position={'popper'}
            side={'bottom'}
            style={{ width: dynamicWidth }}
          >
            <SelectViewport>
              <SelectGroup className={s.selectGroup}>
                {options.map((opt, idx) => (
                  <SelectItem key={idx} value={opt}>
                    <Typography option={'body1'}>{opt}</Typography>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </div>
    </SelectRoot>
  )
}

type RadixItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item>
type SelectItemProps = {
  className?: string
} & RadixItemProps

const SelectItem = forwardRef<ElementRef<'div'>, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item className={clsx(s.selectItem, className)} {...props} ref={forwardedRef}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)
