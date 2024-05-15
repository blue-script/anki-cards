import {
  CreatePasswordForm,
  FormValuesFromCreate,
<<<<<<<< HEAD:src/features/auth/createPassword/createPassword.stories.tsx
} from '@/features/auth/createPassword/createPassword'
========
} from '@/components/auth/createPassword/createPasswordForm'
>>>>>>>> b382d7249e5b01c5928da9b87e798dd846d28750:src/features/auth/createPassword/createPasswordForm.stories.tsx
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
