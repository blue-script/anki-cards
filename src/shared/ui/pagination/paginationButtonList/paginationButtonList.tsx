import { PaginationButtonItem } from '@/shared/ui/pagination/paginationButtonItem/paginationButtonItem'
import clsx from 'clsx'

import s from '@/shared/ui/pagination/pagination.module.scss'

type PaginationButtonListProps = {
  currentPage: number
  onPageChange: (value: number) => void
  paginationRange: number[]
}
export const PaginationButtonList = ({
  currentPage,
  onPageChange,
  paginationRange,
}: PaginationButtonListProps) => {
  return (
    <>
      {paginationRange.map((page, index) => {
        const key = `${page}-${index}`
        const handleClick = page === -1 ? undefined : () => onPageChange(page)

        if (page === -1) {
          return (
            <span className={s.dot} key={key}>
              &#8230;
            </span>
          )
        }

        return (
          <PaginationButtonItem
            className={clsx(currentPage === page ? s.selected : '')}
            key={key}
            onClick={handleClick}
          >
            {page === -1 ? '…' : page}
          </PaginationButtonItem>
        )
      })}
    </>
  )
}
