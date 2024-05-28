import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DecksTable } from '@/entities'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './decks19.module.scss'

import SvgTrashOutline from './../../assets/icons/TrashOutline'

const tabsSwitcher = [
  { disabled: false, text: 'My Cards', value: 'My Cards' },
  { disabled: false, text: 'All Cards', value: 'All Cards' },
]

export const Decks19 = () => {
  const [search, setSearch] = useState('')
  const [tabSwitcherValue, setTabSwitcherValue] = useState('All Cards')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebounce(search, 1500)
  const { data: decks } = useGetDecksQuery({
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    name: debouncedSearch,
  })
  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })
  const handleSearchChange = (search: string) => {
    setSearch(search)
  }
  const handleItemsPerPage = (page: number) => {
    setItemsPerPage(page)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const resetFilters = () => {
    reset()
    setSearch('')
  }
  const handleValueChange = (value: string) => {
    setTabSwitcherValue(value)
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
        <FormTextField
          control={control}
          name={'name'}
          onValueChange={handleSearchChange}
          placeholder={'Input search'}
          variant={'search'}
        />
        <TabSwitcher
          label={'Show decks cards'}
          onValueChange={handleValueChange}
          tabs={tabsSwitcher}
          value={tabSwitcherValue}
        />
        <Slider label={'Number of cards'} />
        <Button onClick={resetFilters} variant={'secondary'}>
          <SvgTrashOutline />
          Clear Filter
        </Button>
      </div>
      <div className={s.table}>
        <DecksTable
          // currentUserId={decks?.items.}
          decks={decks?.items}
          onDeleteClick={id => id}
          onEditClick={id => id}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={itemsPerPage}
        setPageSize={handleItemsPerPage}
        totalCount={decks?.pagination.totalItems || 50}
      />
    </Page>
  )
}
