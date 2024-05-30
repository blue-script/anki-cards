import { ChangeEvent, ReactNode } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/shared'

import s from '@/features/profile/profileAvatar/profileAvatar.module.scss'

type Props<T extends FieldValues> = {
  children: ReactNode
  setValue: (
    name: string,
    value: File | null,
    options?: Partial<{ shouldDirty: boolean; shouldValidate: boolean }>
  ) => void
  variantButton?: 'primary' | 'secondary'
} & UseControllerProps<T>

export const ImageUpload = <T extends FieldValues>({
  children,
  control,
  name,
  setValue,
  variantButton = 'primary',
}: Props<T>) => {
  const {
    field: { value, ...fieldWithoutRef },
    fieldState: { error },
  } = useController({ control, name })

  const handleSelectFile = () => {
    const fileInput = document.getElementById(name) as HTMLInputElement

    if (fileInput) {
      fileInput.click()
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select a valid image file.')
        setValue(name, null)
      } else {
        setValue(name, file)
      }
    } else {
      setValue(name, null)
    }
  }

  if (error?.message) {
    toast.error(error.message)
  }

  return (
    <>
      <Button
        className={s.editAvatarButton}
        fullWidth
        onClick={handleSelectFile}
        type={'reset'}
        variant={variantButton}
      >
        {children}
      </Button>
      <input
        accept={'image/*'}
        id={name}
        style={{ display: 'none' }}
        type={'file'}
        {...fieldWithoutRef}
        onChange={handleImageChange}
      />
    </>
  )
}
