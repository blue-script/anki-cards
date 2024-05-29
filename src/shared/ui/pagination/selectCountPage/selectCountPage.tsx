import { Select } from '@/shared'

import s from '@/shared/ui/pagination/pagination.module.scss'

type SelectCountPageProps = {
  setPageSize: (value: number) => void
}
export const SelectCountPage = ({ setPageSize }: SelectCountPageProps) => {
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
        // placeholder={'5'}
        // value={'5'}
      />
      на странице
    </div>
  )
}
