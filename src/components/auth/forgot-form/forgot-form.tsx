import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Typography } from '@/components'
import { FormTextField } from '@/components/ui/form/form-textfield'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './forgot-form.module.scss'

type Props = {
  className?: string
  onSubmit: (values: FormValuesFromForgot) => void
  style?: CSSProperties
}

const emailCustomValidation = z
  .string()
  .email({ message: 'Invalid email format' })
  .refine(
    value => {
      const parts = value.split('@')

      return parts[0].length > 1 && parts[1].length > 3
    },
    {
      message:
        "Email must have more than 1 character before '@' and more than 3 characters after '@'",
    }
  )

const loginSchema = z.object({
  email: emailCustomValidation,
})

export type FormValuesFromForgot = z.infer<typeof loginSchema>

export const ForgotForm = ({ className, onSubmit, style }: Props) => {
  const { control, handleSubmit } = useForm<FormValuesFromForgot>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)} style={style}>
        <Typography as={'h1'} className={s.headerText} color={'light'} option={'h1'}>
          {'Forgot your password?'}
        </Typography>
        <FormTextField className={s.emailField} control={control} label={'Email'} name={'email'} />
        <Typography className={s.emailText} color={'light'} option={'body2'}>
          {'Enter your email address and we will send you further instructions'}
        </Typography>
        <Button className={s.sendBtn} fullWidth>
          <Typography color={'light'} option={'subtitle2'}>
            Send Instructions
          </Typography>
        </Button>
        <Typography className={s.rememberText} color={'light'} option={'body2'}>
          {'Did you remember your password?'}
        </Typography>
        <Button as={'a'} className={s.linkBtn} variant={'link'}>
          Try logging in
        </Button>
      </form>
    </>
  )
}
