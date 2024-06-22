import { ChangeEvent, useRef } from 'react'

import { Edit2 } from '@/assets/icons'
import defaultAvatar from '@/assets/img/default-avatar-large.png'
import { Button } from '@/shared'

import s from './profileAvatar.module.scss'

type Props = {
  avatar: string
  editBodyStatus: boolean
  onAvatarChange: (newAvatar: File | string) => void
}

export const ProfileAvatar = ({ avatar, editBodyStatus, onAvatarChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef.current?.click()
  }

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file?.type.match('image.*')) {
      onAvatarChange(file)
    } else {
      alert('Please select a valid image file.')
    }
  }

  return (
    <div className={s.containerAvatar}>
      <img alt={'avatar'} src={avatar || defaultAvatar} />
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
