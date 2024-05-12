import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Select, TextField } from '@/components'
import { DecksTable } from '@/services/decks/decks-table/decks-table'
import { useGetDecksQuery } from '@/services/flashcards-api'

export function DecksPage() {
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

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  //const result = useGetDecksQuery()                                                                          // parameter For Pagination, Sort and etc.
  const { data: decks, error, isLoading } = useGetDecksQuery({ itemsPerPage, name: search })
  const tableHandlerDelete = (id: string) => {
    console.log('decks-page delete', id)
  }

  const tableHandlerEdit = (id: string) => {
    console.log('decks-page edit', id)
  }

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
      <DecksTable
        decks={decks?.items}
        onDeleteClick={tableHandlerDelete}
        onEditClick={tableHandlerEdit}
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
