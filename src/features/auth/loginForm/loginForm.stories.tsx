<<<<<<<< HEAD:src/features/auth/loginForm/loginForm.stories.tsx
import { FormValues, LoginForm } from '@/features/auth/loginForm/loginForm'
========
import { FormValues, LoginForm } from '@/components/auth/loginForm/loginForm'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/components/auth/loginForm/loginForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react'

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
