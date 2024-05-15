import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from '@/shared/ui/pagination/pagination.module.scss'

type PaginationButtonItemProps = ComponentPropsWithoutRef<'button'>
export const PaginationButtonItem = ({
  children,
  className,
  ...rest
}: PaginationButtonItemProps) => {
  return (
    <button className={clsx(s.button, s.paginationButtonItem, className)} {...rest}>
      {children}
    </button>
  )
}
