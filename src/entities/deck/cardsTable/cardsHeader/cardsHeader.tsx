import { useState } from 'react'

import { ArrowIosForward } from '@/assets/icons'
import { Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

type Props = {
  changeOrder: (value: string) => void
}

type SortOrder = 'asc' | 'desc'
type SortColumn = 'answer' | 'grade' | 'question' | 'updated'

export const CardsHeader = ({ changeOrder }: Props) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortColumn; order: SortOrder }>({
    key: 'answer',
    order: 'asc',
  })

  const handleSort = (key: SortColumn) => {
    let order: SortOrder = 'asc'

    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc'
    }

    setSortConfig({ key, order })
    changeOrder(`${key}-${order}`)
  }

  const getArrowClass = (key: SortColumn) =>
    clsx({
      [s.arrowClass]: sortConfig.key === key,
      [s.arrowNone]: sortConfig.key !== key,
      [s.rotate90]: sortConfig.key === key && sortConfig.order === 'asc',
      [s.rotate270]: sortConfig.key === key && sortConfig.order === 'desc',
    })

  return (
    <Table.THead>
      <Table.TRow className={s.nowrap}>
        <Table.Th className={s.question} onClick={() => handleSort('question')}>
          <div className={s.th}>
            Question
            <ArrowIosForward className={getArrowClass('question')} />
          </div>
        </Table.Th>
        <Table.Th className={s.answer} onClick={() => handleSort('answer')}>
          <div className={s.th}>
            Answer
            <ArrowIosForward className={getArrowClass('answer')} />
          </div>
        </Table.Th>
        <Table.Th onClick={() => handleSort('updated')}>
          <div className={s.th}>
            Last Updated
            <ArrowIosForward className={getArrowClass('updated')} />
          </div>
        </Table.Th>
        <Table.Th onClick={() => handleSort('grade')}>
          <div className={s.th}>
            Grade
            <ArrowIosForward className={getArrowClass('grade')} />
          </div>
        </Table.Th>
        <Table.Th className={s.empty}></Table.Th>
      </Table.TRow>
    </Table.THead>
  )
}
