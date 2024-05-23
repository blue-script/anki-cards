import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/shared'

type FormSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  'onBlur' | 'onValueChange' | 'value'
> &
  UseControllerProps<T>

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  options,
  ...rest
}: FormSelectProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name,
  })

  return <Select {...rest} {...field} onValueChange={onChange} options={options} value={value} />
}
