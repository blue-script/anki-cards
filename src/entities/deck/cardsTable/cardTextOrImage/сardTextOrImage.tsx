import { Typography } from '@/shared'

import s from './сardTextOrImage.module.scss'

type Props = {
  img?: null | string
  text: string
}

export const CardTextOrImage = ({ img, text }: Props) => {
  return img ? (
    <img alt={text} className={s.questionImg} src={img} />
  ) : (
    <Typography option={'body2'}>{text}</Typography>
  )
}
