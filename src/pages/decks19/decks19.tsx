import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { AddNewDeckModal, DecksTable, DeleteDeckModal, EditDeckModal } from '@/entities'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './decks19.module.scss'

import SvgTrashOutline from './../../assets/icons/TrashOutline'

const tabsSwitcher = [
  { disabled: false, text: 'My Cards', value: 'my' },
  { disabled: false, text: 'All Cards', value: 'all' },
]

const useURLSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setParam = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  const getParam = (key: string, defaultValue: string = '') => {
    return searchParams.get(key) ?? defaultValue
  }

  return { getParam, searchParams, setParam, setSearchParams }
}

export const Decks19 = () => {
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()
  const { getParam, searchParams, setParam, setSearchParams } = useURLSearchParams()
  const search = getParam('name')
  const itemsPerPage = getParam('itemsPerPage', '10')
  const currentPage = getParam('currentPage', '1')
  const minCardsCount = getParam('minCardsCount', String(minMaxCardsData?.min ?? 0))
  const maxCardsCount = getParam('maxCardsCount', String(minMaxCardsData?.max ?? 25))
  const orderBy = getParam('orderBy', 'updated-asc')
  const currentTabSwitcher = getParam('currentTabSwitcher', 'all')
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const authorId: string | undefined = currentTabSwitcher === 'my' ? currentUserId : undefined
  const debouncedSearch = useDebounce(search, 1000)
  const [openAddNewDeckModal, setOpenAddNewDeckModal] = useState<boolean>(false)
  const [openEditDeckModal, setOpenEditNewDeckModal] = useState<boolean>(false)
  const [openDeleteDeckModal, setOpenDeleteDeckModal] = useState<boolean>(false)
  const [deckId, setDeckId] = useState<string>('')
  const [deckName, setDeckName] = useState<string>('')
  const [deckCover, setDeckCover] = useState<string | undefined>(undefined)
  const [deckIsPrivate, setDeckIsPrivate] = useState<boolean>(true)

  const { data: decks } = useGetDecksQuery({
    authorId: authorId,
    currentPage: +currentPage,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: +maxCardsCount,
    minCardsCount: +minCardsCount,
    name: debouncedSearch,
    orderBy: orderBy,
  })

  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })
  const handleSearchChange = (searchName: string) => {
    setParam('currentPage', '1')
    setParam('name', searchName)
  }
  const handleItemsPerPage = (page: number) => {
    setParam('currentPage', '1')
    setParam('itemsPerPage', String(page))
  }
  const handlePageChange = (page: number) => {
    setParam('currentPage', String(page))
  }
  const resetFilters = () => {
    reset()
    searchParams.delete('name')
    searchParams.delete('currentPage')
    searchParams.delete('minCardsCount')
    searchParams.delete('maxCardsCount')
    searchParams.delete('authorId')
    searchParams.delete('currentTabSwitcher')
    setSearchParams(searchParams)
  }
  const handleTabSwitcherChange = (value: string) => {
    setParam('currentPage', '1')
    setParam('currentTabSwitcher', value)
  }
  const handleSliderChange = ([min, max]: number[]) => {
    setParam('currentPage', '1')
    setParam('minCardsCount', String(min))
    setParam('maxCardsCount', String(max))
  }
  const handleDataSortOrder = () => {
    setParam('orderBy', orderBy === 'updated-desc' ? 'updated-asc' : 'updated-desc')
  }
  const handleAddNewDeckModal = () => {
    setOpenAddNewDeckModal(true)
    resetFilters()
  }
  const handleEditDeck = (
    id: string,
    name: string,
    cover: string | undefined,
    isPrivate: boolean
  ) => {
    setOpenEditNewDeckModal(true)
    setDeckId(id)
    setDeckName(name)
    setDeckCover(cover)
    setDeckIsPrivate(isPrivate)
  }
  const handleDeleteDeck = (deckId: string, name: string) => {
    setOpenDeleteDeckModal(true)
    setDeckId(deckId)
    setDeckName(name)
  }

  console.log(minCardsCount, maxCardsCount)

  return (
    <Page mt={'36px'}>
      {openAddNewDeckModal && (
        <AddNewDeckModal
          open={openAddNewDeckModal}
          setOpen={setOpenAddNewDeckModal}
          title={'Add new deck'}
        />
      )}
      {openEditDeckModal && (
        <EditDeckModal
          cover={deckCover}
          deckId={deckId}
          isPrivate={deckIsPrivate}
          name={deckName}
          open={openEditDeckModal}
          setOpen={setOpenEditNewDeckModal}
          title={'Edit Deck'}
        />
      )}
      {openDeleteDeckModal && (
        <DeleteDeckModal
          deckId={deckId}
          name={deckName}
          open={openDeleteDeckModal}
          setOpen={setOpenDeleteDeckModal}
          title={'Delete Deck'}
        />
      )}
      <div className={s.header}>
        <Typography option={'h1'}>Decks</Typography>
        <Button className={s.widthButton} onClick={handleAddNewDeckModal} variant={'primary'}>
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
          value={currentTabSwitcher}
        />
        <Slider
          label={'Number of cards'}
          max={minMaxCardsData?.max ?? 25}
          min={minMaxCardsData?.min ?? 0}
          onValueChange={handleSliderChange}
          value={[+minCardsCount, +maxCardsCount]}
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
        onDeleteClick={handleDeleteDeck}
        onEditClick={handleEditDeck}
        onIconClick={handleDataSortOrder}
      />
      <Pagination
        currentPage={+currentPage}
        onPageChange={handlePageChange}
        pageSize={+itemsPerPage}
        setPageSize={handleItemsPerPage}
        totalCount={decks?.pagination.totalItems ?? 1}
      />
    </Page>
  )
}
