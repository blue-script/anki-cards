import { CheckEmailForm } from '@/components/auth/checkEmail/check-email-form'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckEmailForm> = {
  component: CheckEmailForm,
  tags: ['autodocs'],
  title: 'Auth/CheckEmailForm',
}

export default meta

export const CheckEmailForm1: StoryObj<typeof meta> = {
  render: () => <CheckEmailForm />,
}
