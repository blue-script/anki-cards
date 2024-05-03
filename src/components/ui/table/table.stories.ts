import type { Meta, StoryObj } from '@storybook/react'

import { DeckTable, dataForDeckTable } from '@/components/ui/table/deckTable'

const meta = {
  component: DeckTable,
  tags: ['autodocs'],
  title: 'Components/DeckTable',
} satisfies Meta<typeof DeckTable>

export default meta
type Story = StoryObj<typeof meta>

export const DeckTable1: Story = {
  args: { decks: dataForDeckTable },
}
