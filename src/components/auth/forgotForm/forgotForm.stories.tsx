import { ForgotForm, FormValuesFromForgot } from '@/components/auth/forgotForm/forgotForm'
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
