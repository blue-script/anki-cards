import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { FormData } from '@/entities/deck/addCardModal/formData/formData'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardArgs } from '@/services/cards/cards.types'
import { Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './cardModal.module.scss'

const cardSchema = z.object({
  answer: z.string().min(3, 'The length of the answer must be more than 3 characters'),
  answerImg: z.union([z.instanceof(File), z.string()]).nullable(),
  id: z.string(),
  question: z.string().min(3, 'The length of the question must be more than 3 characters'),
  questionImg: z.union([z.instanceof(File), z.string()]).nullable(),
})

export type FormCard = z.infer<typeof cardSchema>

type Props = {
  cardId?: string
  onOpenChange: () => void
  open: boolean
} & Partial<CardArgs>

export const CardModal = ({
  answer,
  answerImg,
  cardId,
  onOpenChange,
  open,
  question,
  questionImg,
}: Props) => {
  const { deckId } = useParams<{ deckId: string }>()

  const [questionImgPreview, setQuestionImgPreview] = useState<null | string>('')
  const [answerImgPreview, setAnswerImgPreview] = useState<null | string>('')

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormCard>({
    defaultValues: {
      answer: answer ?? '',
      answerImg: answerImg ?? null,
      id: deckId,
      question: question ?? '',
      questionImg: questionImg ?? null,
    },
    resolver: zodResolver(cardSchema),
  })

  const questionImgWatch = watch('questionImg')
  const answerImgWatch = watch('answerImg')

  useEffect(() => {
    if (questionImgWatch instanceof File) {
      const previewUrl = URL.createObjectURL(questionImgWatch)

      setQuestionImgPreview(previewUrl)

      return () => {
        URL.revokeObjectURL(previewUrl)
      }
    } else {
      setQuestionImgPreview(null)
    }
  }, [questionImgWatch])

  useEffect(() => {
    if (answerImgWatch instanceof File) {
      const previewUrl = URL.createObjectURL(answerImgWatch)

      setAnswerImgPreview(previewUrl)

      return () => {
        URL.revokeObjectURL(previewUrl)
      }
    } else {
      setAnswerImgPreview(null)
    }
  }, [answerImgWatch])

  if (!deckId) {
    return <div>Error</div>
  }

  const submitHandler = handleSubmit(async (data: CardArgs) => {
    console.log(data)
    try {
      if (cardId) {
        await updateCard({ cardId, data })
        toast.success('Card updated successfully!')
      } else {
        await createCard({ data, deckId })
        toast.success('Card added successfully!')
      }
      reset()
    } catch (e) {
      toast.error('Failed to save card')
    } finally {
      onOpenChange()
    }
  })

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={cardId ? 'Edit Card' : 'Add New Card'}>
      <form onSubmit={submitHandler}>
        <div className={s.body}>
          <FormData
            control={control}
            imgName={'questionImg'}
            imgPreview={questionImgPreview}
            imgWatch={questionImgWatch}
            placeholder={'Question'}
            setValue={setValue}
            textName={'question'}
          />
          <FormData
            control={control}
            imgName={'answerImg'}
            imgPreview={answerImgPreview}
            imgWatch={answerImgWatch}
            placeholder={'Answer'}
            setValue={setValue}
            textName={'answer'}
          />
        </div>
        <Modal.Footer
          countButton={CountButton.Two}
          firstButtonName={cardId ? 'Update Card' : 'Add New Card'}
          firstButtonType={'submit'}
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
