<<<<<<<< HEAD:src/features/auth/checkEmail/checkEmail.stories.tsx
import { CheckEmail } from '@/features/auth/checkEmail/checkEmail'
========
import { CheckEmailForm } from '@/components/auth/checkEmail/checkEmailForm'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/features/auth/checkEmail/checkEmailForm.stories.tsx
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckEmail> = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Auth/CheckEmailForm',
}

const action1 = action('Forward to Sign In form')

export default meta

export const CheckEmailForm1: StoryObj<typeof meta> = {
  render: () => <CheckEmail onSubmit={action1} />,
}
