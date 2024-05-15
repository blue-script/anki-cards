import { Star } from '@/assets/icons'

import s from './grade.module.scss'

type Props = {
  grade: number
}

export const Grade = ({ grade }: Props) => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <Star className={idx < grade ? s.shaded : s.hollow} key={idx} />
      ))}
    </>
  )
}
