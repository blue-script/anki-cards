import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { Typography } from '@/components'
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

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email format' }),
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
      </form>
    </>
  )
}
