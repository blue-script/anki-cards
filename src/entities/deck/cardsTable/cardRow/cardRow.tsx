import { Edit2Outline, TrashOutline } from '@/assets/icons'
<<<<<<<< HEAD:src/entities/deck/cardsTable/cardRow/cardRow.tsx
import { CardTextOrImage } from '@/entities/deck/cardsTable/cardTextOrImage'
========
import { CardTextOrImage } from '@/entities/cards/cardsTable/cardTextOrImage'
>>>>>>>> 4eb6ec14e91f68fbb5600a29b59b3d8507a6abae:src/entities/cards/cardsTable/cardRow/cardRow.tsx
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
