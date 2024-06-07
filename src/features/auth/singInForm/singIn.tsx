import { useForm } from 'react-hook-form'

// import { Link } from 'react-router-dom'
import { Button, Card, Typography } from '@/shared/ui'
import { FormCheckbox, FormTextField } from '@/shared/ui/form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './singIn.module.scss'

const schema = z.object({
  email: z
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
    ),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters long' })
    .max(25, { message: 'Password must not exceed 25 characters' })
    .refine(password => /[a-z]/.test(password), {
      message: 'Password must include a lowercase letter',
    }),
  // .refine(password => /[A-Z]/.test(password), {
  //   message: 'Password must include an uppercase letter',
  // }),
  // .refine(password => /[!@#$%^&*()]/.test(password), {
  //   message: 'Password must include one of the special characters',
  // }),
  rememberMe: z.boolean().optional(),
})

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          Sign In
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <div className={s.textField}>
              <FormTextField
                className={s.bgInput}
                control={control}
                fullWidth
                label={'Email'}
                name={'email'}
                placeholder={'Enter email'}
              />
            </div>
            <div className={s.textField}>
              <FormTextField
                control={control}
                fullWidth
                label={'Password'}
                name={'password'}
                placeholder={'Enter password'}
                variant={'password'}
              />
            </div>
          </div>
          <FormCheckbox
            className={s.checkbox}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
          />
          <Typography
            // as={Link}
            className={s.recoverPasswordLink}
            // to={'/recover-password'}
            option={'link2'}
          >
            Forgot Password?
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.caption} option={'body2'}>
          {`Don't have an account?`}
        </Typography>
        <Typography
          // as={Link}
          className={s.signUpLink}
          // to={'/sign-up'}
          option={'link1'}
        >
          Sign Up
        </Typography>
      </Card>
    </>
  )
}
