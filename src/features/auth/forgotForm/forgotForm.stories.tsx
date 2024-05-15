<<<<<<<< HEAD:src/features/auth/forgotForm/forgotForm.stories.tsx
import { ForgotForm, FormValuesFromForgot } from '@/features/auth/forgotForm/forgotForm'
========
import { ForgotForm, FormValuesFromForgot } from '@/components/auth/forgotForm/forgotForm'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/components/auth/forgotForm/forgotForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ForgotForm> = {
  component: ForgotForm,
  tags: ['autodocs'],
  title: 'Auth/ForgotPasswordForm',
}

export default meta

const handleSubmit = (data: FormValuesFromForgot) => {
  console.log(data)
}

export const ForgotForm1: StoryObj<typeof meta> = {
  args: {
    onSubmit: handleSubmit,
  },
  render: args => <ForgotForm onSubmit={args.onSubmit} />,
}
