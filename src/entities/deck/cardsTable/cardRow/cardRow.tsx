import { Edit2Outline, TrashOutline } from '@/assets/icons'
import { CardTextOrImage } from '@/entities'
import { Card } from '@/services/cards/cards.types'
import { Button, Grade, Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardRow.module.scss'

type Props = {
  isOwner: boolean
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
} & Card

export const CardRow = ({
  answer,
  answerImg,
  grade,
  id,
  isOwner,
  onDeleteClick,
  onEditClick,
  question,
  questionImg,
  updated,
}: Props) => {
  const handleEditClick = (id: string) => onEditClick(id)
  const handleDeleteClick = (id: string) => onDeleteClick(id)

  return (
    <Table.TRow>
      <Table.Td>
        <CardTextOrImage img={questionImg} text={question} />
      </Table.Td>
      <Table.Td>
        <CardTextOrImage img={answerImg} text={answer} />
      </Table.Td>
      <Table.Td>{new Date(updated).toLocaleDateString('ru-ru')}</Table.Td>
      <Table.Td className={clsx(s.stars, s.nowrap)}>
        <Grade grade={grade} />
      </Table.Td>
      <Table.Td className={s.nowrap}>
        {isOwner && (
          <div className={s.buttons}>
            <Button className={s.button} onClick={() => handleEditClick(id)} variant={'secondary'}>
              <Edit2Outline />
            </Button>
            <Button
              className={s.button}
              onClick={() => handleDeleteClick(id)}
              variant={'secondary'}
            >
              <TrashOutline />
            </Button>
          </div>
        )}
      </Table.Td>
    </Table.TRow>
  )
}
