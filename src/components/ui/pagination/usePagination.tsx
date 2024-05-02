import { useMemo } from 'react'

type Props = {
  currentPage: number
  pageSize: number
  siblingCount: number
  totalCount: number
}

const DOTS = -1

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, index) => index + start)
}

export const usePagination = (props: Props) => {
  const { currentPage, pageSize, siblingCount = 1, totalCount } = props

  const paginationRange = useMemo(() => {
    const totalPagesCount = Math.ceil(totalCount / pageSize)

    // 2 * DOTS + First and Last Page + Current Page + siblingCount
    const totalPageNumbers = 5 + siblingCount

    if (totalPageNumbers >= totalPagesCount) {
      return range(1, totalPagesCount)
    }

    const leftSideSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSideSiblingIndex = Math.min(currentPage + siblingCount, totalPagesCount)

    const shouldShowLeftDots = leftSideSiblingIndex > 2
    const shouldShowRightDots = rightSideSiblingIndex < totalPagesCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPagesCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(firstPageIndex, leftItemCount)

      return [...leftRange, DOTS, lastPageIndex]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPagesCount - rightItemCount + 1, totalPagesCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSideSiblingIndex, rightSideSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
