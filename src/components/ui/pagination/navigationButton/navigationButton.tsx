import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from '@/components/ui/pagination/pagination.module.scss'

type NavigationButtonProps = ComponentPropsWithoutRef<'button'>
export const NavigationButton = ({ onClick, ...rest }: NavigationButtonProps) => {
  return <button className={clsx(s.button, s.buttonNavigation)} onClick={onClick} {...rest} />
}
