import { Edit2Outline, PlayCircleOutline, Star, TrashOutline } from '@/assets/icons'
import { Deck } from '@/services/decks/decks.types'
import { Table } from '@/shared/ui/table/table'

type DeckTableProps = {
  decks: Deck[]
}
export const DeckRow = ({ deck }: { deck: Deck }) => (
  <Table.TRow key={deck.id}>
    <Table.Td className={'withWrapper'}>
      <div>
        <img alt={'Default'} src={'./src/assets/img/default-img.jpg'} />
        {deck.name}
      </div>
    </Table.Td>
    <Table.Td>{new Date(deck.updated).toLocaleDateString('en-GB')}</Table.Td>
    <Table.Td>{deck.cardsCount}</Table.Td>
    <Table.Td>{deck.created}</Table.Td>
    <Table.Td className={'centeredTd'}>
      {[...Array(5)].map((_, i) => (
        <Star
          // color={i < deck.rating ? '#e5ac39' : '#000'}
          color={i < 4 ? '#e5ac39' : '#000'}
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

export const dataForDeckTable: Deck[] = [
  {
    author: { id: 'test', name: 'Author' },
    cardsCount: 1,
    created: '',
    id: 'string',
    isPrivate: false,
    name: 'string',
    updated: 'string',
    userId: 'string',
  },
]
