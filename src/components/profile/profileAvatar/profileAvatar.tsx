import { ChangeEvent, useRef } from 'react'

import { Edit2 } from '@/assets/icons'

import s from '@/components/profile/profileAvatar/profileAvatar.module.scss'

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
    const file = e.target.files?.length && e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        const newAvatar = e.target?.result as string

        onAvatarChange(newAvatar)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={s.containerAvatar}>
      <img alt={'avatar'} src={avatar} />
      {!editBodyStatus && (
        <>
          <button className={s.editAvatarButton} onClick={selectFileHandler}>
            <Edit2 />
          </button>
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
