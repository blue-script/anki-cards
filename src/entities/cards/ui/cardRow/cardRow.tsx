import { Edit2Outline, TrashOutline } from '@/assets/icons'
import { CardTextOrImage } from '@/entities/cards/ui/cardTextOrImage'
import { Card } from '@/services/cards/cards.types'
import { Button, Grade, Table } from '@/shared'

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
      <Table.Td className={s.starWrapper}>
        <Grade grade={grade} />
      </Table.Td>
      <Table.Td>
        {isOwner && (
          <>
            <Button className={s.button} onClick={() => handleEditClick(id)}>
              <Edit2Outline />
            </Button>
            <Button className={s.button} onClick={() => handleDeleteClick(id)}>
              <TrashOutline />
            </Button>
          </>
        )}
      </Table.Td>
    </Table.TRow>
  )
}
