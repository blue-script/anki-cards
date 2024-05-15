import { UseFormReturn, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const nicknameSchema = z.object({
  name: z.string().min(3, { message: 'Nickname must be at least 3 characters long' }),
})

const defaultFormValue = {
  name: '',
}

export type FormValues = z.infer<typeof nicknameSchema>

export const useProfileBody = (defaultValue?: FormValues): UseFormReturn<FormValues> => {
  return useForm<FormValues>({
    defaultValues: {
      ...defaultFormValue,
      ...defaultValue,
    },
    resolver: zodResolver(nicknameSchema),
  })
}
