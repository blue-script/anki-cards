import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextField } from './'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter to search',
    variant: 'search',
  },
  render: args => {
    const [value, setValue] = useState('')

    return (
      <TextField
        clear={() => setValue('')}
        label={args.label}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder={args.placeholder}
        value={value}
        variant={args.variant}
      />
    )
  },
}

export const InputFullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Email',
    placeholder: 'Enter your email',
  },
}
export const PasswordInputFullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'password',
  },
}
export const SearchInputFullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Search',
    placeholder: 'Enter to search',
    variant: 'search',
  },
}
export const InputError: Story = {
  args: {
    errorMessage: 'error',
    label: 'Email',
  },
}

export const PasswordError: Story = {
  args: {
    errorMessage: 'error',
    label: 'Password',
    variant: 'password',
  },
}

export const SearchError: Story = {
  args: {
    errorMessage: 'error',
    label: 'Search',
    variant: 'search',
  },
}

export const FullWidthError: Story = {
  args: {
    errorMessage: 'error',
    fullWidth: true,
    label: 'Email',
  },
}
export const InputDisabled: Story = {
  args: {
    disabled: true,
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'password',
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    label: 'Search',
    placeholder: 'Enter to search',
    variant: 'search',
  },
}

export const FullWidthDisabled: Story = {
  args: {
    disabled: true,
    fullWidth: true,
    label: 'Email',
    placeholder: 'Enter your email',
  },
}
