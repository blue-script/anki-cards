import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'
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

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const debounceText = useDebounce<string>(search, 500)

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data: decks } = useGetDecksQuery({ itemsPerPage, name: debounceText })

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = (data: any) => {
    console.log('line 46', data)
    handleSubmit(data)
  }

  return (
    <Page className={s.wrapper} mt={'10px'}>
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
            onValueChange={handleSearchChange}
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
        <div className={s.rowContainer}>
          <DecksTable
            className={s.tableMargin}
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
        </div>
        <div className={s.rowContainer}>
          <Pagination
            currentPage={1}
            onPageChange={numOfItems => handleItemsPerPage(numOfItems.toString())}
            pageSize={10}
            setPageSize={numOfItems => handleItemsPerPage(numOfItems.toString())}
            style={{ marginTop: '15px' }}
            totalCount={200}
          />
        </div>
      </form>
    </Page>
  )
}
