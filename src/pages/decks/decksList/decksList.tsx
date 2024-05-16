import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormTextField, Page, TabSwitcher, Typography } from '@/shared'

import s from './decksList.module.scss'

type tabValueT = 'All Cards' | 'My Cards'

type Props = {
  addNewDeck: () => void
  clearFilter: () => void
}

export const DecksList = (props: Props) => {
  const [tabValue, setTabValue] = useState<tabValueT>('All Cards')

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: any) => {
    handleSubmit(data)
  }

  return (
    <Page mt={'-20px'}>
      <form onSubmit={onSubmit}>
        <div className={s.upperContainer}>
          <Typography as={'h1'} option={'h1'}>
            Decks List
          </Typography>
          <Button>Add new deck</Button>
        </div>
        <div>
          <FormTextField control={control} name={'name'} placeholder={'Input search'} />
          <TabSwitcher
            onValueChange={(value: string) => {
              setTabValue(value as tabValueT)
            }}
            tabs={[
              { text: 'My Cards', value: 'My Cards' },
              { text: 'All Cards', value: 'All Cards' },
            ]}
            value={tabValue}
          />
        </div>
      </form>
    </Page>
  )
}
