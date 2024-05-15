import { CheckEmail } from '@/features/auth/checkEmail/checkEmail'
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
