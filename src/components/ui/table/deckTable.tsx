import { Edit2Outline, PlayCircleOutline, Star, TrashOutline } from '@/assets/icons'
import { Table } from '@/components/ui/table/table'

type Deck = {
  actions: string
  cardsCount: number
  createdBy: string
  id: string
  name: string
  rating: number
  updated: Date
}

type DeckTableProps = {
  decks: Deck[]
}
const DeckRow = ({ deck }: { deck: Deck }) => (
  <Table.TRow key={deck.id}>
    <Table.Td className={'withWrapper'}>
      <div>
        <img alt={'Default'} src={'./src/assets/img/default-img.jpg'} />
        {deck.name}
      </div>
    </Table.Td>
    <Table.Td>{deck.updated.toLocaleDateString('en-GB')}</Table.Td>
    <Table.Td>{deck.cardsCount}</Table.Td>
    <Table.Td>{deck.createdBy}</Table.Td>
    <Table.Td className={'centeredTd'}>
      {[...Array(5)].map((_, i) => (
        <Star
          color={i < deck.rating ? '#e5ac39' : '#000'}
          key={i}
          stroke={i === 4 ? '#e5ac39' : undefined}
          strokeWidth={i === 4 ? 1 : undefined}
        />
      ))}
    </Table.Td>
    <Table.Td>
      <PlayCircleOutline />
      <Edit2Outline />
      <TrashOutline />
    </Table.Td>
  </Table.TRow>
)

export const DeckTable = ({ decks }: DeckTableProps) => (
  <Table.TRoot>
    <Table.THead>
      <Table.TRow>
        <Table.Th>Name</Table.Th>
        <Table.Th>Last Updated</Table.Th>
        <Table.Th>Cards</Table.Th>
        <Table.Th>Created By</Table.Th>
        <Table.Th>Rating</Table.Th>
        <Table.Th>Actions</Table.Th>
      </Table.TRow>
    </Table.THead>
    <Table.TBody>
      {decks.map(deck => (
        <DeckRow deck={deck} key={deck.id} />
      ))}
    </Table.TBody>
  </Table.TRoot>
)

export const dataForDeckTable = [
  {
    actions: 'icons 1',
    cardsCount: 15,
    createdBy: 'User 1',
    id: '1',
    name: 'Games',
    rating: 4,
    updated: new Date(),
  },
  {
    actions: 'icons 3',
    cardsCount: 25,
    createdBy: 'User 2',
    id: '2',
    name: 'Books',
    rating: 4,
    updated: new Date(),
  },
  {
    actions: 'icons 3',
    cardsCount: 35,
    createdBy: 'User 3',
    id: '3',
    name: 'English',
    rating: 4,
    updated: new Date(),
  },
]
