import { useState } from 'react'

import { DecksTable } from '@/entities'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { Button, Page, Pagination, Slider, TabSwitcher, TextField, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './decks19.module.scss'

import SvgTrashOutline from './../../assets/icons/TrashOutline'

export const Decks19 = () => {
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const debouncedSearch = useDebounce(search, 1500)
  const {
    data: decks,
    error,
    isLoading,
  } = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
    name: debouncedSearch,
  })

  const tabs = [
    { disabled: false, text: 'My Cards', value: 'My Cards' },
    { disabled: false, text: 'All Cards', value: 'All Cards' },
  ]

  const pagination = {
    currentPage: 1,
    pageSize: 1,
    siblingCount: 1,
    totalCount: 4,
  }
  const handleSearch = (search: string) => {
    setSearch(search)
  }
  const handleItemsPerPage = (page: number) => {
    setItemsPerPage(page)
  }

  return (
    <Page mt={'36px'}>
      <div className={s.header}>
        <Typography option={'h1'}>Decks</Typography>
        <Button className={s.widthButton} variant={'primary'}>
          Add New Deck
        </Button>
      </div>
      <div className={s.filter}>
        <TextField onValueChange={handleSearch} value={search} variant={'search'} />
        <TabSwitcher
          label={'Show decks cards'}
          onValueChange={value => value}
          tabs={tabs}
          value={'All Cards'}
        />
        <Slider label={'Number of cards'} />
        <Button variant={'secondary'}>
          <SvgTrashOutline />
          Clear Filter
        </Button>
      </div>
      <div className={s.table}>
        <DecksTable decks={decks?.items} onDeleteClick={id => id} onEditClick={id => id} />
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        onPageChange={(value: number) => value}
        pageSize={pagination.pageSize}
        setPageSize={handleItemsPerPage}
        siblingCount={pagination.siblingCount}
        totalCount={pagination.totalCount}
      />
    </Page>
  )
}
