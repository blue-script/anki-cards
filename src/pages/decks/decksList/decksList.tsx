import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import { Button, FormTextField, Page, Slider, TabSwitcher, Typography } from '@/shared'
import { clsx } from 'clsx'

import s from './decksList.module.scss'

type tabValueT = 'All Cards' | 'My Cards'

export const DecksList = () => {
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
    <Page className={s.wrapper} mt={'-20px'}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <div className={s.rowContainer}>
          <Typography as={'h1'} option={'h1'}>
            Decks List
          </Typography>
          <Button>Add new deck</Button>
        </div>
        <div className={clsx(s.rowContainer, s.rowHeight)}>
          <FormTextField
            control={control}
            name={'name'}
            placeholder={'Input search'}
            variant={'search'}
          />
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
          <Slider label={'Number of cards'} max={10} min={0} value={[2, 10]}></Slider>
          <Button icon variant={'secondary'}>
            <TrashOutline />
            Clear filter
          </Button>
        </div>
        <DecksTable
          currentUserId={'f2be95b9-4d07-4751-a775-bd612fc9553a'}
          decks={decks?.items}
          // onDeleteClick={id => {
          //   deleteDeck({ id })
          // }}
          // onEditClick={id => {
          //   updateDeck({ id, name: 'hotPeppers new deck' })
          // }}
          onDeleteClick={() => {
            console.log('onDeleteClick')
          }}
          onEditClick={() => {
            console.log('onEditClick')
          }}
        />
      </form>
    </Page>
  )
}
