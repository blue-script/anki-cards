import { ChangeEvent, ReactNode } from 'react'
import { FieldValues, Path, PathValue, UseControllerProps, useController } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/shared'

type Props<T extends FieldValues> = {
  children: ReactNode
  className?: string
  setValue: (
    name: Path<T>,
    value: PathValue<T, Path<T>>,
    options?: Partial<{ shouldDirty: boolean; shouldValidate: boolean }>
  ) => void
  variantButton: 'primary' | 'secondary'
} & UseControllerProps<T>

export const ImageUpload = <T extends FieldValues>({
  children,
  className,
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
        setValue(name, null as PathValue<T, Path<T>>)
      } else {
        setValue(name, file as PathValue<T, Path<T>>)
      }
    } else {
      setValue(name, null as PathValue<T, Path<T>>)
    }
  }

  if (error?.message) {
    toast.error(error.message)
  }

  return (
    <>
      <Button
        className={className}
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
