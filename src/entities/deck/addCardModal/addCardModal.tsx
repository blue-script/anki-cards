import { ChangeEvent, useRef } from 'react'

import { Edit2 } from '@/assets/icons'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { Button, Modal, TextField } from '@/shared'

import s from '@/features/profile/profileAvatar/profileAvatar.module.scss'

type Props = {
  onOpenChange: () => void
  open: boolean
}

export const AddCardModal = ({ onOpenChange, open }: Props) => {
  const [createCard] = useCreateCardMutation()

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select a valid image file.')

        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        const newAvatar = e.target?.result as string

        console.log(newAvatar)
        // if (newAvatar) {
        //   onAvatarChange(newAvatar)
        // }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Add New Card'}>
      Question:
      <TextField fullWidth label={'Question?'} />
      <>
        <Button className={s.editAvatarButton} onClick={selectFileHandler}>
          <Edit2 />
        </Button>
        <input
          accept={'image/*'}
          onChange={uploadHandler}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </>
      <Modal.Footer
        countButton={2}
        firstButtonName={'Add New Card'}
        secondButtonHandler={onOpenChange}
        secondButtonName={'Cancel'}
      />
    </Modal>
  )
}
