import {
  CreatePasswordForm,
  FormValuesFromCreate,
} from '@/components/auth/createPassword/createPasswordForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CreatePasswordForm> = {
  component: CreatePasswordForm,
  tags: ['autodocs'],
  title: 'Auth/CreatePasswordForm',
}

export default meta

const handleSubmit = (data: FormValuesFromCreate) => {
  console.log(data)
}

export const CreatePasswordForm1: StoryObj<typeof meta> = {
  args: {
    onSubmit: handleSubmit,
  },
  render: args => <CreatePasswordForm onSubmit={args.onSubmit} />,
}
