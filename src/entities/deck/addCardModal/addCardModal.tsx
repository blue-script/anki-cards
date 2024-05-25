import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CreateCardArgs } from '@/services/cards/cards.types'
import { ImageUpload, Modal, TextField, Typography } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string(),
  answerImg: z.string(),
  id: z.string(),
  question: z.string(),
  questionImg: z.string(),
})

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const { deckId } = useParams<{ deckId: string }>()
  const [createCard] = useCreateCardMutation()

  const [question, setQuestion] = useState<string>('')
  const [questionImg, setQuestionImg] = useState<string>('')

  const [answer, setAnswer] = useState<string>('')
  const [answerImg, setAnswerImg] = useState<string>('')

  const { handleSubmit } = useForm<CreateCardArgs>({
    defaultValues: { answer: '', id: deckId, question: '' },
    resolver: zodResolver(addCardSchema),
  })

  const submitHandler = (data: CreateCardArgs) => {
    // createCard(data)
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={s.body}>
          <div>
            Question:
            <TextField fullWidth label={'Question?'} />
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
            <TextField fullWidth label={'Answer'} />
            {answerImg && <img alt={'Uploaded'} className={s.img} src={questionImg} />}
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
          secondButtonHandler={onOpenChange}
          secondButtonName={'Cancel'}
        />
      </form>
    </Modal>
  )
}
