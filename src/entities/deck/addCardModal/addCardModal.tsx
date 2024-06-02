import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CardArgs } from '@/services/cards/cards.types'
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

  const questionImgWatch = watch('questionImg')
  const answerImgWatch = watch('answerImg')

  if (!deckId) {
    return <div>Error</div>
  }

  const submitHandler = handleSubmit((data: CardArgs) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    if (data.questionImg) {
      formData.append('questionImg', data.questionImg)
    }
    if (data.answerImg) {
      formData.append('answerImg', data.answerImg)
    }

    createCard({ data: formData, deckId })
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
            {questionImgWatch && (
              <img alt={'Uploaded'} className={s.img} src={URL.createObjectURL(questionImgWatch)} />
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
              <img alt={'Uploaded'} className={s.img} src={URL.createObjectURL(answerImgWatch)} />
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
          firstButtonName={'Add New Card'}
          firstButtonType={'submit'}
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
