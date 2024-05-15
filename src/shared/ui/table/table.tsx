import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export type TableProps = ComponentPropsWithoutRef<'table'>
export type TableRowProps = ComponentPropsWithoutRef<'tr'>
export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>
export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>
export type TableHeadCellProps = ComponentPropsWithoutRef<'th'>
export type TableDataCellProps = ComponentPropsWithoutRef<'td'>

const TRoot = forwardRef<ElementRef<'table'>, TableProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.table, className)

  return <table className={computedClass} ref={ref} {...rest} />
})

const TRow = forwardRef<ElementRef<'tr'>, TableRowProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.trow, className)

  return <tr className={computedClass} ref={ref} {...rest} />
})

const THead = forwardRef<ElementRef<'thead'>, TableHeaderProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.thead, className)

  return <thead className={computedClass} ref={ref} {...rest} />
})

const TBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(className)

  return <tbody className={computedClass} ref={ref} {...rest} />
})

const Th = forwardRef<ElementRef<'th'>, TableHeadCellProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.th, className)

  return <th className={computedClass} ref={ref} {...rest} />
})

const Td = forwardRef<ElementRef<'td'>, TableDataCellProps>(({ className, ...rest }, ref) => {
  const computedClass = clsx(s.td, className)

  return <td className={computedClass} ref={ref} {...rest} />
})

export const Table = {
  TBody,
  THead,
  TRoot,
  TRow,
  Td,
  Th,
}
