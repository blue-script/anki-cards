import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { FormData } from '@/entities/deck/addCardModal/formData/formData'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CardArgs } from '@/services/cards/cards.types'
import { FormTextField, ImageUpload, Modal, Typography } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string(),
  answerImg: z.union([z.instanceof(File), z.string()]).nullable(),
  id: z.string(),
  question: z.string(),
  questionImg: z.union([z.instanceof(File), z.string()]).nullable(),
})

export type CreateCardSchema = z.infer<typeof addCardSchema>

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const { deckId } = useParams<{ deckId: string }>()

  const [questionImgPreview, setQuestionImgPreview] = useState<null | string>('')
  const [answerImgPreview, setAnswerImgPreview] = useState<null | string>('')

  const [createCard] = useCreateCardMutation()

  const { control, handleSubmit, reset, setValue, watch } = useForm<CreateCardSchema>({
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
    // questionImgPreview && URL.revokeObjectURL(questionImgPreview)
    if (questionImgWatch instanceof File) {
      setQuestionImgPreview(URL.createObjectURL(questionImgWatch))
    }

    return () => {
      questionImgPreview && URL.revokeObjectURL(questionImgPreview)
    }
  }, [questionImgWatch, questionImgPreview])

  useEffect(() => {
    if (answerImgWatch instanceof File) {
      setAnswerImgPreview(URL.createObjectURL(answerImgWatch))
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
          <div>
            Answer:
            <FormTextField control={control} fullWidth label={'Answer'} name={'answer'} />
            {answerImgPreview && <img alt={'Uploaded'} className={s.img} src={answerImgPreview} />}
          </div>
          <ImageUpload
            control={control}
            name={'answerImg'}
            setValue={setValue}
            variantButton={'secondary'}
          >
            <Layer2 />
            <Typography option={'subtitle2'}>
              {answerImgWatch ? 'Change Image' : 'Upload Image'}
            </Typography>
          </ImageUpload>
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
