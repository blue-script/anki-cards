import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/shared'

type FormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'name' | 'onBlur' | 'onChange'
> &
  UseControllerProps<T>

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  ...rest
}: FormCheckboxProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name,
  })

  return <Checkbox {...rest} {...field} checked={value} onChange={onChange} />
}
