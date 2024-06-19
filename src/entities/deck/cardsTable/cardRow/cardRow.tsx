import { useState } from 'react'
import toast from 'react-hot-toast'

import { Edit2Outline, TrashOutline } from '@/assets/icons'
import { CardTextImage } from '@/entities'
import { CardModal } from '@/entities/deck/cardModal/cardModal'
import { DeleteCardModal } from '@/entities/deck/deleteCardModal/deleteCardModal'
import { useDeleteCardMutation } from '@/services/cards/cards.service'
import { Card } from '@/services/cards/cards.types'
import { Button, Grade, Table } from '@/shared'
import { clsx } from 'clsx'

import s from './cardRow.module.scss'

type Props = {
  isOwner: boolean
} & Card

export const CardRow = ({
  answer,
  answerImg,
  grade,
  id,
  isOwner,
  question,
  questionImg,
  updated,
}: Props) => {
  const [deleteCard] = useDeleteCardMutation()

  const onDeleteCard = () => {
    deleteCard({ id })
      .unwrap()
      .then(() => toast.success(`Delete card`))
      .catch(err => toast.error('Failed to delete deck:', err))
  }
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const handleOpenChange = () => {
    setDeleteModal(prev => !prev)
  }

  const [editModal, setEditModal] = useState(false)
  const handleEditOpenChange = () => {
    setEditModal(prev => !prev)
  }

  return (
    <Table.TRow>
      <Table.Td>
        <CardTextImage img={questionImg} text={question} />
      </Table.Td>
      <Table.Td>
        <CardTextImage img={answerImg} text={answer} />
      </Table.Td>
      <Table.Td>{new Date(updated).toLocaleDateString('ru-ru')}</Table.Td>
      <Table.Td className={clsx(s.stars, s.nowrap)}>
        <Grade grade={grade} />
      </Table.Td>
      <Table.Td className={s.nowrap}>
        {isOwner && (
          <div className={s.buttons}>
            <Button className={s.button} onClick={handleEditOpenChange} variant={'secondary'}>
              <Edit2Outline />
            </Button>
            {editModal && (
              <CardModal
                answer={answer}
                answerImg={answerImg}
                cardId={id}
                onOpenChange={handleEditOpenChange}
                open={editModal}
                question={question}
                questionImg={questionImg}
              />
            )}

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
