import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { DecksTable } from '@/entities/decks/ui/decksTable'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import { Button, FormTextField, Select, TextField } from '@/shared'

export function DecksPage() {
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data: decks, error, isLoading } = useGetDecksQuery({ itemsPerPage, name: search })

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = handleSubmit(data => {
    createDeck(data)
  })

  if (isLoading) {
    return <div>Loading... Spinner</div>
  }

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
      <TextField label={'Search'} onValueChange={handleSearchChange} />
      <Select
        onValueChange={numOfItems => handleItemsPerPage(numOfItems)}
        options={['10', '20', '30', '50', '100']}
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
      />
    </div>
  )
}
