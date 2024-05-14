import { useForm } from 'react-hook-form'

import { FormTextfield } from '@/components/ui/form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './singUp.module.scss'

import { Button, Card, Typography } from '../../ui'

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
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'Password must include an uppercase letter',
    })
    .refine(password => /[!@#$%^&*()]/.test(password), {
      message: 'Password must include one of the special characters',
    }),
  rememberMe: z.boolean().optional(),
})

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const SignUp = ({ onSubmit }: Props) => {
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
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <FormTextfield
              control={control}
              fullWidth
              label={'Email'}
              name={'email'}
              placeholder={'Enter email'}
            />
            <FormTextfield
              control={control}
              fullWidth
              label={'Password'}
              name={'password'}
              placeholder={'Enter password'}
              variant={'password'}
            />
            <FormTextfield
              control={control}
              fullWidth
              label={'Confirm Password'}
              name={'password'}
              placeholder={'Enter confirm password'}
              variant={'password'}
            />
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Typography className={s.caption} option={'body2'}>
          {`Already have an account?`}
        </Typography>
        <Typography className={s.signUpLink} option={'link1'}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
