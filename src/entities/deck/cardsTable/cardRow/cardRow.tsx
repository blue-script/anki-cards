import { useState } from 'react'
import toast from 'react-hot-toast'

import { Edit2Outline, TrashOutline } from '@/assets/icons'
import { CardTextOrImage } from '@/entities'
import { DeleteCardModal } from '@/entities/deck/deleteCardModal/deleteCardModal'
import { useDeleteCardMutation } from '@/services/cards/cards.service'
import { Card } from '@/services/cards/cards.types'
import { Button, Grade, Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardRow.module.scss'

type Props = {
  isOwner: boolean
  onEditClick: (id: string) => void
} & Card

export const CardRow = ({
  answer,
  answerImg,
  grade,
  id,
  isOwner,
  onEditClick,
  question,
  questionImg,
  updated,
}: Props) => {
  const handleEditClick = (id: string) => onEditClick(id)

  const [deleteCard] = useDeleteCardMutation()

  const onDeleteCard = () => {
    deleteCard({ id }).then(() => toast.success(`Delete card`))
  }
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const handleOpenChange = () => {
    setDeleteModal(prev => !prev)
  }

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
            <Button className={s.button} onClick={handleOpenChange} variant={'secondary'}>
              <TrashOutline />
            </Button>
            <DeleteCardModal
              closeModal={handleOpenChange}
              onDeleteCard={onDeleteCard}
              open={deleteModal}
            />
          </div>
        )}
      </Table.Td>
    </Table.TRow>
  )
}
