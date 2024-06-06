import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/shared'

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'errorMessage' | 'name' | 'onBlur' | 'onChange'
> &
  UseControllerProps<T>

export const FormTextField = <T extends FieldValues>({
  control,
  name,
  value,
  ...rest
}: FormTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField {...rest} {...field} errorMessage={error?.message} value={value} />
}
