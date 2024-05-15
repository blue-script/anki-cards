import { Edit2, MoreVerticalOutline, PlayCircleOutline, Trash } from '@/assets/icons'
import { Dropdown, Typography } from '@/shared'

type Props = {}

export const DropDownDeck = ({}: Props) => {
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
        <Dropdown.Item>
          <Trash />
          <Typography as={'span'} option={'caption'}>
            Delete
          </Typography>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
