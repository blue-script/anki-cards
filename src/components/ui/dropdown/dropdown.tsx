import { ComponentProps, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

const Root = DropdownMenu.Root
const Trigger = forwardRef<
  ElementRef<typeof DropdownMenu.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
>((props, ref) => {
  const { className, ...rest } = props

  return <DropdownMenu.Trigger className={clsx(s.trigger, className)} ref={ref} {...rest} />
})

Trigger.displayName = DropdownMenu.Trigger.displayName

const Content = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>((props, ref) => {
  const { children, className, ...rest } = props

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className={clsx(s.content, className)} ref={ref} {...rest}>
        {children}
        <DropdownMenu.Arrow asChild>
          <div className={s.upArrow}></div>
        </DropdownMenu.Arrow>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
})

Content.displayName = DropdownMenu.Content.displayName

const Item = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  ComponentProps<typeof DropdownMenu.Item>
>((props, ref) => {
  const { className, ...rest } = props

  return <DropdownMenu.Item className={clsx(s.item, className)} ref={ref} {...rest} />
})

Item.displayName = DropdownMenu.Item.displayName

const Separator = forwardRef<
  ElementRef<typeof DropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>((props, ref) => {
  const { className, ...rest } = props

  return <DropdownMenu.Separator className={clsx(s.separator, className)} ref={ref} {...rest} />
})

Separator.displayName = DropdownMenu.Separator.displayName

const Label = forwardRef<
  ElementRef<typeof DropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DropdownMenu.Label
      className={clsx(s.label, className)}
      ref={ref}
      {...rest}
    ></DropdownMenu.Label>
  )
})

Label.displayName = DropdownMenu.Label.displayName

export const Dropdown = {
  Content,
  Item,
  Label,
  Root,
  Separator,
  Trigger,
}
