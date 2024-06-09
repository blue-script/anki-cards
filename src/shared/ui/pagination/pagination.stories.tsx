import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from '@/shared'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Pagination',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 200,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(args.currentPage)
    const [pageSize, setPageSize] = useState(args.pageSize)

    return (
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={args.totalCount}
      />
    )
  },
}
