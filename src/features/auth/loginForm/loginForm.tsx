import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, FormTextField, Typography } from '@/shared'
import { FormCheckbox } from '@/shared/ui/form/formCheckbox'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './loginForm.module.scss'

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

      <form className={s.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <Typography className={s.headingText} option={'h1'}>
          Sign In
        </Typography>
        <div className={s.emailWrapper}>
          <FormTextField control={control} fullWidth label={'Email'} name={'email'} />
        </div>
        <div className={s.passwordWrapper}>
          <FormTextField
            control={control}
            fullWidth
            label={'Password'}
            name={'password'}
            variant={'password'}
          />
        </div>
        <FormCheckbox
          className={s.checkBox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography as={Link} className={s.forgotText} option={'body2'} to={'/forgotPassword'}>
          Forgot Password ?
        </Typography>
        <Button className={s.buttonWrapper} fullWidth type={'submit'}>
          Sign In
        </Button>
        <Typography className={s.dontText} option={'body2'}>{`Don't have an account?`}</Typography>
        <Typography as={Link} className={s.signUpText} option={'h2'} to={'/signUp'}>
          Sign Up
        </Typography>
      </form>
    </>
  )
}
