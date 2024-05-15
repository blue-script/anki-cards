import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/shared'

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'errorMessage' | 'name' | 'onBlur' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const FormTextfield = <T extends FieldValues>({
  control,
  name,
  ...rest
}: FormTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField {...rest} {...field} errorMessage={error?.message} />
}
