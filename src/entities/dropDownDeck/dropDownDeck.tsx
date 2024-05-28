import { Edit2, MoreVerticalOutline, PlayCircleOutline, Trash } from '@/assets/icons'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Dropdown, Typography } from '@/shared'

type Props = { deckId: string }

export const DropDownDeck = ({ deckId }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const onDeleteDeck = () => deleteDeck({ id: deckId })

  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <MoreVerticalOutline />
      </Dropdown.Trigger>
      <Dropdown.Content align={'end'}>
        <Dropdown.Item>
          <PlayCircleOutline />
          <Typography as={'span'} option={'caption'}>
            Learn
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>
          <Edit2 />
          <Typography as={'span'} option={'caption'}>
            Edit
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={onDeleteDeck}>
          <Trash />
          <Typography as={'span'} option={'caption'}>
            Delete
          </Typography>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
