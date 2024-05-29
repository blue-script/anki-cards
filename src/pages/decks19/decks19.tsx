import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('name') ?? ''
  const [tabSwitcherValue, setTabSwitcherValue] = useState('All Cards')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(25)
  const [orderBy, setOrderBy] = useState('updated-asc')
  const [currentUserId, setCurrentUserId] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const { data: decks } = useGetDecksQuery({
    authorId: currentUserId,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: maxCardsCount,
    minCardsCount: minCardsCount,
    name: debouncedSearch,
    orderBy: orderBy,
  })
  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })
  const handleSearchChange = (searchName: string) => {
    setCurrentPage(1)
    if (searchName.length) {
      searchParams.set('name', searchName)
    } else {
      searchParams.delete('name')
    }
    setSearchParams(searchParams)
  }
  const handleItemsPerPage = (page: number) => {
    setCurrentPage(1)
    setItemsPerPage(page)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const resetFilters = () => {
    reset()
    searchParams.delete('name')
    setSearchParams(searchParams)
    setCurrentPage(1)
    setMinCardsCount(0)
    setMaxCardsCount(25)
    setTabSwitcherValue('All Cards')
    setCurrentUserId('')
  }
  const handleTabSwitcherChange = (value: string) => {
    setCurrentPage(1)
    setTabSwitcherValue(value)
    value === 'My Cards'
      ? setCurrentUserId('f2be95b9-4d07-4751-a775-bd612fc9553a')
      : setCurrentUserId('')
  }
  const handleSliderChange = ([minCardsCount, maxCardsCount]: number[]) => {
    setMinCardsCount(minCardsCount)
    setMaxCardsCount(maxCardsCount)
  }
  const handleDataSortOrder = () => {
    if (orderBy === 'updated-desc') {
      setOrderBy('updated-asc')
    }
    if (orderBy === 'updated-asc') {
      setOrderBy('updated-desc')
    }
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
          onValueChange={handleTabSwitcherChange}
          tabs={tabsSwitcher}
          value={tabSwitcherValue}
        />
        <Slider
          label={'Number of cards'}
          max={25}
          min={0}
          onValueChange={handleSliderChange}
          value={[minCardsCount, maxCardsCount]}
        />
        <Button onClick={resetFilters} variant={'secondary'}>
          <SvgTrashOutline />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        className={s.table}
        currentUserId={currentUserId}
        decks={decks?.items}
        onDeleteClick={id => id}
        onEditClick={id => id}
        onIconClick={handleDataSortOrder}
      />
      <Pagination
        currentPage={decks?.pagination.currentPage || 1}
        onPageChange={handlePageChange}
        pageSize={decks?.pagination.itemsPerPage || 10}
        setPageSize={handleItemsPerPage}
        totalCount={decks?.pagination.totalItems || 55}
      />
    </Page>
  )
}
