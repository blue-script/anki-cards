import { Typography } from '@/shared'

import s from './сardTextOrImage.module.scss'

type Props = {
  img?: null | string
  text: string
}

export const CardTextImage = ({ img, text }: Props) => {
  return (
    <div className={s.container}>
      {img && <img alt={text} className={s.img} src={img} />}
      <Typography className={s.text} option={'body2'}>
        {text}
      </Typography>
    </div>
  )
}
