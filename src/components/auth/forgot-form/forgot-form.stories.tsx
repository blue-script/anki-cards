import { ForgotForm, FormValuesFromForgot } from '@/components/auth/forgot-form/forgot-form'
import { Meta, StoryObj } from '@storybook/react'

// Define meta with proper type annotation
const meta: Meta<typeof ForgotForm> = {
  component: ForgotForm,
  tags: ['autodocs'],
  title: 'Auth/CheckEmail',
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
