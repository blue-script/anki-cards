import { Control, UseFormSetValue } from 'react-hook-form'

import { Layer2, Trash } from '@/assets/icons'
import { FormAddCard } from '@/entities/deck/addCardModal/addCardModal'
import { FormTextField, ImageUpload, Typography } from '@/shared'

import s from './formData.module.scss'

type Props = {
  control: Control<FormAddCard>
  imgName: 'answerImg' | 'questionImg'
  imgPreview: null | string
  imgWatch: File | null | string
  placeholder: string
  setValue: UseFormSetValue<FormAddCard>
  textName: 'answer' | 'question'
}

export const FormData = ({
  control,
  imgName,
  imgPreview,
  imgWatch,
  placeholder,
  setValue,
  textName,
}: Props) => {
  const onDelete = () => {
    setValue(imgName, null)
  }

  return (
    <div className={s.container}>
      {placeholder}:
      <FormTextField control={control} fullWidth label={`${placeholder}?`} name={`${textName}`} />
      {imgPreview && (
        <div className={s.imageContainer}>
          <button className={s.deleteImage} onClick={onDelete} type={'button'}>
            <Trash />
          </button>
          <img alt={'Uploaded'} className={s.img} src={imgPreview} />
        </div>
      )}
      <ImageUpload
        className={s.topMargin}
        control={control}
        name={imgName}
        setValue={setValue}
        variantButton={'secondary'}
      >
        <Layer2 />
        <Typography option={'subtitle2'}>{imgWatch ? 'Change Image' : 'Upload Image'}</Typography>
      </ImageUpload>
    </div>
  )
}
