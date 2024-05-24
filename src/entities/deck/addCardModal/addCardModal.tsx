import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Layer2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { CreateCardArgs } from '@/services/cards/cards.types'
import { ImageUpload, Modal, TextField, Typography } from '@/shared'

import s from './addCardModal.module.scss'

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
  })

  const submitHandler = (data: CreateCardArgs) => {
    // createCard(data)
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      <form onSubmit={handleSubmit(submitHandler)}>
        Question:
        <TextField fullWidth label={'Question?'} />
        {questionImg && (
          <img alt={'Uploaded'} src={questionImg} style={{ height: '100px', width: '100px' }} />
        )}
        <ImageUpload handleChangeImage={setQuestionImg} variantButton={'secondary'}>
          <Layer2 />
          <Typography option={'subtitle2'}>
            {questionImg ? 'Change Image' : 'Upload Image'}
          </Typography>
        </ImageUpload>
        Answer:
        <TextField fullWidth label={'Answer'} />
        {questionImg && (
          <img alt={'Uploaded'} src={questionImg} style={{ height: '100px', width: '100px' }} />
        )}
        <div className={s.answer}>
          <ImageUpload handleChangeImage={setQuestionImg} variantButton={'secondary'}>
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
