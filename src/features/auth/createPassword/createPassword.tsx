import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

<<<<<<<< HEAD:src/features/auth/createPassword/createPassword.tsx
import { Button, Typography } from '@/shared'
import { FormTextField } from '@/shared/ui/form/formTextfield'
========
import { Button, Typography } from '@/components'
import { FormTextfield } from '@/components/ui/form/formTextfield'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/features/auth/createPassword/createPasswordForm.tsx
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

<<<<<<<< HEAD:src/features/auth/createPassword/createPassword.tsx
import s from './createPassword.module.scss'
========
import s from './createPasswordForm.module.scss'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/features/auth/createPassword/createPasswordForm.tsx

type Props = {
  className?: string
  onSubmit: (values: FormValuesFromCreate) => void
  style?: CSSProperties
}

const passwordSchema = z.object({
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters long' })
    .max(25, { message: 'Password must not exceed 25 characters' })
    .refine(password => /[a-z]/.test(password), {
      message: 'Password must include a lowercase letter',
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'Password must include an uppercase letter',
    })
    .refine(password => /[!@#$%^&*()]/.test(password), {
      message: 'Password must include one of the special characters',
    }),
})

export type FormValuesFromCreate = z.infer<typeof passwordSchema>

export const CreatePasswordForm = ({ className, onSubmit, style }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValuesFromCreate>({
    defaultValues: { password: '' },
    resolver: zodResolver(passwordSchema),
  })

  const handleFormSubmit = (data: FormValuesFromCreate) => {
    onSubmit(data)
    reset()
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}

      <form
        className={clsx(s.form, className)}
        onSubmit={handleSubmit(handleFormSubmit)}
        style={style}
      >
        <Typography as={'h1'} className={s.headerText} option={'h1'}>
          Create new password
        </Typography>
        <FormTextfield
          className={s.emailField}
          control={control}
          fullWidth
          label={'Password'}
          name={'password'}
          variant={'password'}
        />
        <Typography className={s.passwordText} option={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.sendBtn} fullWidth>
          <Typography option={'subtitle2'}>Create New Password</Typography>
        </Button>
      </form>
    </>
  )
}
