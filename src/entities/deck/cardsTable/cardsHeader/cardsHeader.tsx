import { useState } from 'react'

import { ArrowIosForward } from '@/assets/icons'
import { Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

export const CardsHeader = () => {
  const [orderBy, setOrderBy] = useState('asc')
  const handleOrderByToggle = () => {
    setOrderBy(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const arrowClass = clsx({
    [s.arrow]: true,
    [s.rotate90]: orderBy === 'asc',
    [s.rotate270]: orderBy === 'desc',
  })

  return (
    <Table.THead>
      <Table.TRow className={s.nowrap}>
        <Table.Th className={s.question}>Question</Table.Th>
        <Table.Th className={s.answer}>Answer</Table.Th>
        <Table.Th className={s.update}>
          Last Updated <ArrowIosForward className={arrowClass} onClick={handleOrderByToggle} />
        </Table.Th>
        <Table.Th className={s.grade}>Grade</Table.Th>
        <Table.Th className={s.empty}></Table.Th>
      </Table.TRow>
    </Table.THead>
  )
}
