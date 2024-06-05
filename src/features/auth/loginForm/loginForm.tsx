import { useForm } from 'react-hook-form'

import { Button, FormTextField } from '@/shared'
import { FormCheckbox } from '@/shared/ui/form/formCheckbox'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  TOS: z.boolean().optional(),
  email: z.string().trim().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be fewer than 100 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
  rememberMe: z.boolean().optional(),
  selectedValue: z.string().default(''),
})

export type FormValuesFromLoginForm = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (values: FormValuesFromLoginForm) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValuesFromLoginForm>({
    defaultValues: {
      TOS: false,
      email: '',
      password: '',
      rememberMe: false,
      selectedValue: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const handleOnSubmit = (data: FormValuesFromLoginForm) => {
    onSubmit(data)
    reset()
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}

      <form onSubmit={handleSubmit(handleOnSubmit)} style={{ padding: '7px 15px' }}>
        <FormTextField control={control} label={'email'} name={'email'} />
        <FormTextField control={control} label={'password'} name={'password'} />
        <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        <FormCheckbox control={control} label={'Accept terms of service'} name={'TOS'} />

        {/*<FormSelect*/}
        {/*  control={control}*/}
        {/*  name={'selectedValue'}*/}
        {/*  options={['first', 'second', 'third']}*/}
        {/*/>*/}
        <Button type={'submit'}>Submit</Button>
      </form>
    </>
  )
}
