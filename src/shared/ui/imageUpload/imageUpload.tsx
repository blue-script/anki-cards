import { ChangeEvent, useRef } from 'react'

import { Button } from '@/shared'

import s from '@/features/profile/profileAvatar/profileAvatar.module.scss'

type Props = {
  children: React.ReactNode
  handleChangeImage: (value: string) => void
  variantButton?: 'primary' | 'secondary'
}

export const ImageUpload = ({ children, handleChangeImage, variantButton = 'primary' }: Props) => {
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
        const newImage = e.target?.result as string

        if (newImage) {
          handleChangeImage(newImage)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Button
        className={s.editAvatarButton}
        fullWidth
        onClick={selectFileHandler}
        variant={variantButton}
      >
        {children}
      </Button>
      <input
        accept={'image/*'}
        onChange={uploadHandler}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </>
  )
}
