import { ChangeEvent, useRef } from 'react'

import { Edit2 } from '@/assets/icons'
import { Button } from '@/shared'

import s from './profileAvatar.module.scss'

type Props = {
  avatar: string
  editBodyStatus: boolean
  onAvatarChange: (newAvatar: string) => void
}

export const ProfileAvatar = ({ avatar, editBodyStatus, onAvatarChange }: Props) => {
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

        if (newAvatar) {
          onAvatarChange(newAvatar)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={s.containerAvatar}>
      <img alt={'avatar'} src={avatar} />
      {!editBodyStatus && (
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
      )}
    </div>
  )
}
