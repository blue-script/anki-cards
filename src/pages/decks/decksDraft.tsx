import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { DecksTable } from '@/entities/decks/decksTable/decksTable'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useLazyGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import { Button, FormTextField, Select, TextField, Typography } from '@/shared'

export function DecksDraft() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { data: decks, error } = useGetDecksQuery({ itemsPerPage, name: search })
  const [getDecks, { data: decksData, isLoading: isDecksLoading }] = useLazyGetDecksQuery()

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = handleSubmit(data => {
    createDeck(data)
  })

  if (error) {
    return <div>{`Error ${error}`}</div>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        margin: '0 auto',
        width: '1024px',
      }}
    >
      <div>
        <Typography option={'h1'}>
          Get decks is loading : {JSON.stringify(isDecksLoading)}
        </Typography>
        <Button onClick={() => getDecks()}>Get decks</Button>
        <DecksTable
          decks={decksData?.items}
          onDeleteClick={() => {
            console.log('del')
          }}
          onEditClick={() => {
            console.log('edit')
          }}
          onIconClick={() => {
            console.log('learn')
          }}
        />
      </div>

      <TextField label={'Search'} onValueChange={handleSearchChange} />
      <Select
        onValueChange={numOfItems => handleItemsPerPage(numOfItems)}
        options={['10', '20', '30', '50', '100']}
        placeholder={10}
      />
      <form onSubmit={onSubmit}>
        <FormTextField control={control} label={'New deck name'} name={'name'} />
        <Button>Create deck</Button>
      </form>
      <DecksTable
        currentUserId={'f2be95b9-4d07-4751-a775-bd612fc9553a'}
        decks={decks?.items}
        onDeleteClick={id => {
          deleteDeck({ id })
        }}
        onEditClick={id => {
          updateDeck({ id, name: 'hotPeppers new deck' })
        }}
        onIconClick={() => {}}
      />
    </div>
  )
}
