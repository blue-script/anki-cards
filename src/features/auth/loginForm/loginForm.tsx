import { useForm } from 'react-hook-form'

<<<<<<<< HEAD:src/features/auth/loginForm/loginForm.tsx
import { Button } from '@/shared'
import { FormCheckbox } from '@/shared/ui/form/formCheckbox'
import { FormSelect } from '@/shared/ui/form/formSelect'
import { FormTextField } from '@/shared/ui/form/formTextfield'
========
import { Button } from '@/components'
import { FormCheckbox } from '@/components/ui/form/formCheckbox'
import { FormSelect } from '@/components/ui/form/formSelect'
import { FormTextfield } from '@/components/ui/form/formTextfield'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/components/auth/loginForm/loginForm.tsx
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

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (values: FormValues) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      TOS: false,
      email: '',
      password: '',
      rememberMe: false,
      selectedValue: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const handleOnSubmit = (data: FormValues) => {
    onSubmit(data)
    reset()
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}

      <form onSubmit={handleSubmit(handleOnSubmit)} style={{ padding: '7px 15px' }}>
        <FormTextfield control={control} label={'email'} name={'email'} />
        <FormTextfield control={control} label={'password'} name={'password'} />
        <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        <FormCheckbox control={control} label={'Accept terms of service'} name={'TOS'} />

        <FormSelect
          control={control}
          name={'selectedValue'}
          options={['first', 'second', 'third']}
        />
        <Button type={'submit'}>Submit</Button>
      </form>
    </>
  )
}
