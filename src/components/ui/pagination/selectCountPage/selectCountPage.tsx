import { Select } from '@/components'

import s from '@/components/ui/pagination/pagination.module.scss'

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
        options={['10', '20', '30', '50', '100']}
        placeholder={'10'}
        value={'10'}
      />
      на странице
    </div>
  )
}
