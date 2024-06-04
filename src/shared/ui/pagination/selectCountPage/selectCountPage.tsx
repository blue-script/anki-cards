import { Select } from '@/shared'

import s from '@/shared/ui/pagination/pagination.module.scss'

type SelectCountPageProps = {
  placeholder: number
  setPageSize: (value: number) => void
}
export const SelectCountPage = ({ placeholder, setPageSize }: SelectCountPageProps) => {
  const selectCountPageHandler = (value: string) => {
    setPageSize(+value)
  }

  return (
    <div className={s.selectContainer}>
      Показать
      <Select
        className={s.select}
        onValueChange={selectCountPageHandler}
        options={['5', '10', '20', '30', '50']}
        placeholder={placeholder}
        // value={'5'}
      />
      на странице
    </div>
  )
}
