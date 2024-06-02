import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardArgs } from '@/services/cards/cards.types'
import { FormTextField, ImageUpload, Modal, Typography } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editCardModal.module.scss'

const editCardSchema = z.object({
  answer: z.string(),
  answerImg: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
  id: z.string(),
  question: z.string(),
  questionImg: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
})

type EditCardSchema = z.infer<typeof editCardSchema>

type Props = {
  cardId: string
  onOpenChange: () => void
  open: boolean
} & Partial<CardArgs>

export const EditCardModal = ({
  answer,
  answerImg,
  cardId,
  onOpenChange,
  open,
  question,
  questionImg,
}: Props) => {
  const { deckId } = useParams<{ deckId: string }>()
  const [updateCard] = useUpdateCardMutation()

  const { control, handleSubmit, reset, setValue, watch } = useForm<EditCardSchema>({
    defaultValues: { answer, answerImg: answerImg, id: deckId, question, questionImg: questionImg },
    resolver: zodResolver(editCardSchema),
  })

  const questionImgWatch = watch('questionImg')
  const answerImgWatch = watch('answerImg')

  const submitHandler = handleSubmit((data: CardArgs) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    if (data.questionImg instanceof File) {
      formData.append('questionImg', data.questionImg)
    }
    if (data.answerImg instanceof File) {
      formData.append('answerImg', data.answerImg)
    }

    updateCard({ cardId, data: formData })
      .unwrap()
      .then(() => {
        reset()
        toast.success('Card edit successfully!')
      })
      .catch(() => toast.error('Failed to edit card'))
      .finally(() => onOpenChange())
  })

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      <form onSubmit={submitHandler}>
        <div className={s.body}>
          <div>
            Question:
            <FormTextField control={control} fullWidth label={'Question?'} name={'question'} />
            {questionImgWatch && (
              <img
                alt={'Uploaded'}
                className={s.img}
                src={
                  typeof questionImgWatch === 'string'
                    ? questionImgWatch
                    : URL.createObjectURL(questionImgWatch)
                }
              />
            )}
          </div>
          <ImageUpload
            control={control}
            name={'questionImg'}
            setValue={setValue}
            variantButton={'secondary'}
          >
            <Layer2 />
            <Typography option={'subtitle2'}>
              {questionImgWatch ? 'Change Image' : 'Upload Image'}
            </Typography>
          </ImageUpload>
          <div>
            Answer:
            <FormTextField control={control} fullWidth label={'Answer'} name={'answer'} />
            {answerImgWatch && (
              <img
                alt={'Uploaded'}
                className={s.img}
                src={
                  typeof answerImgWatch === 'string'
                    ? answerImgWatch
                    : URL.createObjectURL(answerImgWatch)
                }
              />
            )}
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
          firstButtonName={'Edit Card'}
          firstButtonType={'submit'}
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
