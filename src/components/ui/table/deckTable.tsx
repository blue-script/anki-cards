import Edit2Outline from '@/assets/icons/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/PlayCircleOutline'
import Star from '@/assets/icons/Star'
import TrashOutline from '@/assets/icons/TrashOutline'
import { Table } from '@/components/ui/table/table'

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

export const DeckTable = (props: DeckTableProps) => {
  const { decks } = props

  return (
    <Table.TRoot>
      <Table.THead>
        <Table.TRow>
          <Table.Th>Name</Table.Th>
          <Table.Th>Last Updated</Table.Th>
          <Table.Th>Cards</Table.Th>
          <Table.Th>Created By</Table.Th>
          <Table.Th>Rating</Table.Th>
          <Table.Th>Icons</Table.Th>
        </Table.TRow>
      </Table.THead>
      <Table.TBody>
        {decks.map(deck => {
          return (
            <Table.TRow key={deck.id}>
              <Table.Td>{deck.name}</Table.Td>
              <Table.Td>{new Date(deck.updated).toLocaleDateString('en-GB')}</Table.Td>
              <Table.Td>{deck.cardsCount}</Table.Td>
              <Table.Td>{deck.createdBy}</Table.Td>
              <Table.Td className={'centeredTd'}>
                <Star color={'#e5ac39'} />
                <Star color={'#e5ac39'} />
                <Star color={'#e5ac39'} />
                <Star color={'#e5ac39'} />
                <Star color={'#000'} stroke={'#e5ac39'} strokeWidth={1} />
              </Table.Td>
              <Table.Td className={'centeredTd'}>
                <PlayCircleOutline color={'#fff'} />
                <Edit2Outline color={'#fff'} />
                <TrashOutline color={'#fff'} />
              </Table.Td>
            </Table.TRow>
          )
        })}
      </Table.TBody>
    </Table.TRoot>
  )
}
