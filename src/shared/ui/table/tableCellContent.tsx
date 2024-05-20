import { Typography } from '@/shared'

import s from './tableCellContent.module.scss'

type TableCellContentProps = {
  href: string
  imageUrl?: string
  name: string
}

export const TableCellContent = ({ href, imageUrl, name }: TableCellContentProps) => {
  return (
    <Typography as={'a'} className={s.cellContent} href={href} option={'body2'}>
      {imageUrl && <img alt={name} className={s.cellImage} src={imageUrl} />}
      {name}
    </Typography>
  )
}
