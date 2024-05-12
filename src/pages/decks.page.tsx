import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { Button, Select, TextField } from '@/components'
import { FormTextField } from '@/components/ui/form'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.servise'
import { DecksTable } from '@/services/decks/decks-table/decks-table'

export function DecksPage() {
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  //const [search, setSearch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('search')
    }
  }

  const [itemsPerPage, setItemsPerPage] = useState(10)

  //const result = useGetDecksQuery()                                                                          // parameter For Pagination, Sort and etc.
  const {
    data: decks,
    error,
    isLoading,
  } = useGetDecksQuery({ itemsPerPage, name: search || undefined })

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = handleSubmit(data => {
    createDeck(data)
  })

  // const tableHandlerDelete = (id: string) => {
  //   console.log('decks-page delete', id)
  // }

  // const tableHandlerEdit = (id: string) => {
  //   console.log('decks-page edit', id)
  // }

  //console.log(result)

  if (isLoading) {
    return <div>Loading... Spinner</div>
  }

  if (error) {
    return <div>{`Error ${error}`}</div>
    // <>
    //   <div>Error happened :</div>
    //   <div>{`Error code => ${error.data.message} with status : ${error.status}`}</div>
    // </>
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
      {/*<TextField label={'Search'} onChange={e => setSearch(e.currentTarget.value)} value={search} />*/}
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

    // <table>
    //   <thead>
    //     <tr>
    //       <th>Name</th>
    //       <th>Cards</th>
    //       <th>Last Updated</th>
    //       <th>Created By</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {decks?.items.map(deck => {
    //       const updatedAt = new Date(deck.updated).toLocaleDateString('en-US')
    //
    //       return (
    //         <tr key={deck.id}>
    //           <td>{deck.name}</td>
    //           <td>{deck.cardsCount}</td>
    //           <td>{updatedAt}</td>
    //           <td>{deck.author.name}</td>
    //         </tr>
    //       )
    //     })}
    //   </tbody>
    // </table>
  )
}
