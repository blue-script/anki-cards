import { useState } from 'react'

import { ArrowIosForward } from '@/assets/icons'
import { Button, Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

export const CardsHeader = () => {
  const [orderBy, setOrderBy] = useState('asc')
  const handleOrderByToggle = () => {
    setOrderBy(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const arrowClass = clsx({
    [s.rotate90]: orderBy === 'asc',
    [s.rotate270]: orderBy === 'desc',
  })

  return (
    <Table.THead>
      <Table.TRow className={s.nowrap}>
        <Table.Th className={s.question}>Question</Table.Th>
        <Table.Th className={s.answer}>Answer</Table.Th>
        <Table.Th className={s.wrapper}>
          Last Updated{' '}
          <Button className={s.button} onClick={handleOrderByToggle} variant={'secondary'}>
            <ArrowIosForward className={arrowClass} />
          </Button>
        </Table.Th>
        <Table.Th>Grade</Table.Th>
        <Table.Th></Table.Th>
      </Table.TRow>
    </Table.THead>
  )
}
