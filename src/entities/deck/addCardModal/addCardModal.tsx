import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CreateCardArgs } from '@/services/cards/cards.types'
import { FormTextField, ImageUpload, Modal, Typography } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string(),
  answerImg: z.string().optional(),
  id: z.string(),
  question: z.string(),
  questionImg: z.string().optional(),
})

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const { deckId } = useParams<{ deckId: string }>()
  const [createCard] = useCreateCardMutation()

  const [questionImg, setQuestionImg] = useState<string>('')
  const [answerImg, setAnswerImg] = useState<string>('')

  const { control, handleSubmit } = useForm<CreateCardArgs>({
    defaultValues: { answer: '', answerImg: '', id: deckId, question: '', questionImg: '' },
    resolver: zodResolver(addCardSchema),
  })

  const submitHandler = handleSubmit((data: CreateCardArgs) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    formData.append('answerImg', data.answerImg | '')
    formData.append('questionImg', data.questionImg)
    createCard(formData)
      .unwrap()
      .then(() => toast.success('Card added successfully!'))
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
            {questionImg && <img alt={'Uploaded'} className={s.img} src={questionImg} />}
          </div>
          <ImageUpload handleChangeImage={setQuestionImg} variantButton={'secondary'}>
            <Layer2 />
            <Typography option={'subtitle2'}>
              {questionImg ? 'Change Image' : 'Upload Image'}
            </Typography>
          </ImageUpload>
          <div>
            Answer:
            <FormTextField control={control} fullWidth label={'Answer'} name={'answer'} />
            {answerImg && <img alt={'Uploaded'} className={s.img} src={answerImg} />}
          </div>
          <ImageUpload handleChangeImage={setAnswerImg} variantButton={'secondary'}>
            <Layer2 />
            <Typography option={'subtitle2'}>
              {answerImg ? 'Change Image' : 'Upload Image'}
            </Typography>
          </ImageUpload>
        </div>
        <Modal.Footer
          countButton={2}
          firstButtonName={'Add New Card'}
          firstButtonType={'submit'}
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
