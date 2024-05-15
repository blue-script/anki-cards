import { Star } from '@/assets/icons'

import s from './stars.module.scss'

type Props = {
  grade: number
}

export const Stars = ({ grade }: Props) => {
  return (
    <>
      {[...Array(5)].reduce((acc, _, idx) => {
        if (idx < grade) {
          acc[idx] = <Star className={s.shaded} />
        } else {
          acc[idx] = <Star className={s.hollow} />
        }

        return acc
      }, [])}{' '}
    </>
  )
}
