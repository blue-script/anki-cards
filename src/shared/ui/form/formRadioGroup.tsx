import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'

export type FormTabSwitcherProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...rest
}: FormTabSwitcherProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name })

  return (
    <RadioGroup
      errorMessage={error?.message}
      name={name}
      onValueChange={onChange}
      value={value}
      {...rest}
    />
  )
}
