import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { FormData } from '@/entities/deck/addCardModal/formData/formData'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CardArgs } from '@/services/cards/cards.types'
import { Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string().min(3, 'The length of the answer must be more than 3 characters'),
  answerImg: z.union([z.instanceof(File), z.string()]).nullable(),
  id: z.string(),
  question: z.string().min(3, 'The length of the question must be more than 3 characters'),
  questionImg: z.union([z.instanceof(File), z.string()]).nullable(),
})

export type FormAddCard = z.infer<typeof addCardSchema>

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const { deckId } = useParams<{ deckId: string }>()

  const [questionImgPreview, setQuestionImgPreview] = useState<null | string>('')
  const [answerImgPreview, setAnswerImgPreview] = useState<null | string>('')

  const [createCard] = useCreateCardMutation()

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormAddCard>({
    defaultValues: {
      answer: '',
      answerImg: null,
      id: deckId,
      question: '',
      questionImg: null,
    },
    resolver: zodResolver(addCardSchema),
  })

  const questionImgWatch = watch('questionImg')
  const answerImgWatch = watch('answerImg')

  useEffect(() => {
    if (questionImgWatch instanceof File) {
      setQuestionImgPreview(URL.createObjectURL(questionImgWatch))
    } else {
      setQuestionImgPreview('')
    }

    return () => {
      questionImgPreview && URL.revokeObjectURL(questionImgPreview)
    }
  }, [questionImgWatch, questionImgPreview])

  useEffect(() => {
    if (answerImgWatch instanceof File) {
      setAnswerImgPreview(URL.createObjectURL(answerImgWatch))
    } else {
      setAnswerImgPreview('')
    }

    return () => {
      answerImgPreview && URL.revokeObjectURL(answerImgPreview)
    }
  }, [answerImgWatch, answerImgPreview])

  if (!deckId) {
    return <div>Error</div>
  }

  const submitHandler = handleSubmit(async (data: CardArgs) => {
    try {
      await createCard({ data, deckId })
      reset()
      toast.success('Card added successfully!')
    } catch (e) {
      toast.error('Failed to add card')
    } finally {
      onOpenChange()
    }
  })

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
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
          firstButtonName={'Add New Card'}
          firstButtonType={'submit'}
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
