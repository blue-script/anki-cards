import { CheckEmailForm } from '@/components/auth/checkEmail/check-email-form'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckEmailForm> = {
  component: CheckEmailForm,
  tags: ['autodocs'],
  title: 'Auth/CheckEmailForm',
}

const action1 = action('Forward to Sign In form')

export default meta

export const CheckEmailForm1: StoryObj<typeof meta> = {
  render: () => <CheckEmailForm onSubmit={action1} />,
}
