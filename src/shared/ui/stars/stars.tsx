import { Star } from '@/assets/icons'

import s from './stars.module.scss'

type Props = {
  grade: number
}

export const Stars = ({ grade }: Props) => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <Star className={idx < grade ? s.shaded : s.hollow} key={idx} />
      ))}
    </>
  )
}
