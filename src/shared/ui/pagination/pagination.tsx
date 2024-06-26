import { CSSProperties } from 'react'

import { ArrowIosBack, ArrowIosForward } from '@/assets/icons'
import { NavigationButton } from '@/shared/ui/pagination/navigationButton/navigationButton'
import { PaginationButtonList } from '@/shared/ui/pagination/paginationButtonList/paginationButtonList'
import { SelectCountPage } from '@/shared/ui/pagination/selectCountPage/selectCountPage'
import { usePagination } from '@/shared/ui/pagination/usePagination'

import s from './pagination.module.scss'

type Props = {
  currentPage: number
  onPageChange: (value: number) => void
  pageSize: number
  setPageSize: (value: number) => void
  siblingCount?: number
  style?: CSSProperties
  totalCount: number
}

export const Pagination = (props: Props) => {
  const {
    currentPage,
    onPageChange,
    pageSize,
    setPageSize,
    siblingCount = 1,
    style,
    totalCount,
  } = props

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  }) as number[]

  let isShowNavigate = true

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    isShowNavigate = false
  }

  const nextPage = () => {
    onPageChange(currentPage + 1)
  }

  const prevPage = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={s.navigationAndSelect} style={style}>
      {isShowNavigate && (
        <div className={s.navigation}>
          <NavigationButton disabled={currentPage === 1} onClick={prevPage}>
            <ArrowIosBack />
          </NavigationButton>
          <PaginationButtonList
            currentPage={currentPage}
            onPageChange={onPageChange}
            paginationRange={paginationRange}
          />
          <NavigationButton disabled={currentPage === lastPage} onClick={nextPage}>
            <ArrowIosForward />
          </NavigationButton>
        </div>
      )}

      <SelectCountPage placeholder={pageSize} setPageSize={setPageSize} />
    </div>
  )
}
