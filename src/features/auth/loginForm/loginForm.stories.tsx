import { Meta, StoryObj } from '@storybook/react'

import { FormValues, LoginForm } from './loginForm'

// Define meta with proper type annotation
const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  tags: ['autodocs'],
  title: 'Auth/LoginForm',
}

export default meta

const handleSubmit = (data: FormValues) => {
  console.log(data)
}

export const LoginForm1: StoryObj<typeof meta> = {
  args: {
    onSubmit: handleSubmit,
  },
  render: args => <LoginForm onSubmit={args.onSubmit} />,
}
