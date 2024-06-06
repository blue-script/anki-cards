import { Control, UseFormSetValue } from 'react-hook-form'

import { Layer2 } from '@/assets/icons'
import { CreateCardSchema } from '@/entities/deck/addCardModal/addCardModal'
import { FormTextField, ImageUpload, Typography } from '@/shared'

import s from './formData.module.scss'

type Props = {
  control: Control<CreateCardSchema>
  imgName: 'answerImg' | 'questionImg'
  imgPreview: null | string
  imgWatch: File | null | string
  placeholder: string
  setValue: UseFormSetValue<CreateCardSchema>
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
  return (
    <div className={s.container}>
      {placeholder}:
      <FormTextField control={control} fullWidth label={`${placeholder}?`} name={`${textName}`} />
      {imgWatch && imgPreview && <img alt={'Uploaded'} className={s.img} src={imgPreview} />}
      <ImageUpload
        className={s.topMargin}
        control={control}
        name={`${imgName}`}
        setValue={setValue}
        variantButton={'secondary'}
      >
        <Layer2 />
        <Typography option={'subtitle2'}>{imgWatch ? 'Change Image' : 'Upload Image'}</Typography>
      </ImageUpload>
    </div>
  )
}
