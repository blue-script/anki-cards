import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CreateCardArgs } from '@/services/cards/cards.types'
import { FormTextField, ImageUpload, Modal, Typography } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string(),
  answerImg: z.instanceof(File).nullable().optional(),
  id: z.string(),
  question: z.string(),
  questionImg: z.instanceof(File).nullable().optional(),
})

type CreateCardSchema = z.infer<typeof addCardSchema>

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const { deckId } = useParams<{ deckId: string }>()
  const [createCard] = useCreateCardMutation()

  const { control, handleSubmit, reset, setValue, watch } = useForm<CreateCardSchema>({
    defaultValues: { answer: '', answerImg: null, id: deckId, question: '', questionImg: null },
    resolver: zodResolver(addCardSchema),
  })

  const questionImg = watch('questionImg')
  const answerImg = watch('answerImg')

  const submitHandler = handleSubmit((data: CreateCardArgs) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    if (data.questionImg) {
      formData.append('questionImg', data.questionImg)
    }
    if (data.answerImg) {
      formData.append('answerImg', data.answerImg)
    }

    createCard({ data: formData, id: deckId })
      .unwrap()
      .then(() => {
        reset()
        toast.success('Card added successfully!')
      })
      .catch(() => toast.error('Failed to add card'))
      .finally(() => onOpenChange())
  })

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      <form onSubmit={submitHandler}>
        <div className={s.body}>
          <div>
            Question:
            <FormTextField control={control} fullWidth label={'Question?'} name={'question'} />
            {questionImg && (
              <img alt={'Uploaded'} className={s.img} src={URL.createObjectURL(questionImg)} />
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
              {questionImg ? 'Change Image' : 'Upload Image'}
            </Typography>
          </ImageUpload>
          <div>
            Answer:
            <FormTextField control={control} fullWidth label={'Answer'} name={'answer'} />
            {answerImg && (
              <img alt={'Uploaded'} className={s.img} src={URL.createObjectURL(answerImg)} />
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
              {answerImg ? 'Change Image' : 'Upload Image'}
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
