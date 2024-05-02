import { ChangeEvent } from 'react'

import s from '@/components/ui/pagination/pagination.module.scss'

type SelectCountPageProps = {
  setPageSize: (value: number) => void
}
export const SelectCountPage = ({ setPageSize }: SelectCountPageProps) => {
  const selectCountPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.currentTarget.value)
  }

  return (
    <div className={s.selectContainer}>
      Показать
      <select className={s.select} onChange={selectCountPageHandler}>
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>50</option>
        <option>100</option>
      </select>
      на странице
    </div>
  )
}
