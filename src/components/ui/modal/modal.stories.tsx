import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Modal } from '@/components/ui/modal/modal'
import { CounButton, ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { action } from '@storybook/addon-actions'

const meta = {
  args: {
    onOpenChange: () => {},
    open: false,
    title: 'Header',
  },
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta

const action1 = action('click1')
const action2 = action('click2')

type Story = StoryObj<typeof meta>

export const ModalWithoutFooter: Story = {
  render: args => {
    const [open, setOpen] = useState(args.open)
    const clickHandler = () => {
      setOpen(!open)
    }

    return (
      <>
        Some text
        <button onClick={clickHandler} style={{ backgroundColor: '#8c61ff' }}>
          Click
        </button>
        <Modal
          onOpenChange={() => {
            setOpen(!open)
          }}
          open={open}
          title={args.title}
        >
          Lorem ipsum dolor sit amet
        </Modal>
      </>
    )
  },
}

export const ModalWithFooterOneButton: Story = {
  render: args => {
    const [open, setOpen] = useState(args.open)
    const clickHandler = () => {
      setOpen(!open)
    }

    return (
      <>
        Some text
        <button onClick={clickHandler} style={{ backgroundColor: '#8c61ff' }}>
          Click
        </button>
        <Modal
          onOpenChange={() => {
            setOpen(!open)
          }}
          open={open}
          title={args.title}
        >
          Lorem ipsum dolor sit amet{' '}
          <ModalFooter
            countButton={CounButton.One}
            firstButtonHandler={action1}
            firstButtonName={'firstButtonName'}
          />
        </Modal>
      </>
    )
  },
}

export const ModalWithFooterTwoButton: Story = {
  render: args => {
    const [open, setOpen] = useState(args.open)
    const clickHandler = () => {
      setOpen(!open)
    }

    return (
      <>
        Some text
        <button onClick={clickHandler} style={{ backgroundColor: '#8c61ff' }}>
          Click
        </button>
        <Modal
          onOpenChange={() => {
            setOpen(!open)
          }}
          open={open}
          title={args.title}
        >
          Lorem ipsum dolor sit amet{' '}
          <ModalFooter
            countButton={CounButton.Two}
            firstButtonHandler={action1}
            firstButtonName={'firstButtonName'}
            secondButtonHandler={action2}
            secondButtonName={'secondButtonName'}
          />
        </Modal>
      </>
    )
  },
}
