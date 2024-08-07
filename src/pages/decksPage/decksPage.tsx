import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { AddNewDeckModal, DecksTable, DeleteDeckModal, EditDeckModal } from '@/entities'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'

import s from './decksPage.module.scss'

import SvgTrashOutline from './../../assets/icons/TrashOutline'
const decksTableColumns = [
  { key: 'name', title: 'Name' },
  { key: 'cardsCount', title: 'Cards' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'created', title: 'Created By' },
  { key: 'controls', sortable: false, title: '' },
]
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

export const DecksPage = () => {
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()
  const { getParam, searchParams, setParam, setSearchParams } = useURLSearchParams()
  const { data: me } = useMeQuery()
  const search = getParam('name')
  const itemsPerPage = getParam('itemsPerPage', '10')
  const currentPage = getParam('currentPage', '1')
  const minCardsCount = getParam('minCardsCount', String(minMaxCardsData?.min ?? 0))
  const maxCardsCount = getParam('maxCardsCount', String(minMaxCardsData?.max ?? 0))
  const orderBy = getParam('orderBy', 'updated-desc')
  const currentTabSwitcher = getParam('currentTabSwitcher', 'all')
  const currentUserId = me?.id
  const authorId: string | undefined = currentTabSwitcher === 'my' ? currentUserId : undefined
  const debouncedSearch = useDebounce(search, 1000)
  const [openAddNewDeckModal, setOpenAddNewDeckModal] = useState<boolean>(false)
  const [openEditDeckModal, setOpenEditNewDeckModal] = useState<boolean>(false)
  const [openDeleteDeckModal, setOpenDeleteDeckModal] = useState<boolean>(false)
  const [deckId, setDeckId] = useState<string>('')
  const [deckName, setDeckName] = useState<string>('')
  const [deckCover, setDeckCover] = useState<null | string | undefined>(null)
  const [deckIsPrivate, setDeckIsPrivate] = useState<boolean>(true)
  const { data: decks } = useGetDecksQuery(
    {
      authorId: authorId,
      currentPage: +currentPage,
      itemsPerPage: +itemsPerPage,
      maxCardsCount: +maxCardsCount,
      minCardsCount: +minCardsCount,
      name: debouncedSearch,
      orderBy: orderBy,
    },
    { skip: !minMaxCardsData }
  )

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
  const handleResetOrderBy = () => {
    setParam('orderBy', 'updated-desc')
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
  const handleDataSortOrder = (sort: string) => {
    setParam('orderBy', sort)
  }
  const handleAddNewDeckModal = () => {
    setOpenAddNewDeckModal(true)
    resetFilters()
  }
  const handleEditDeck = (id: string) => {
    const editDeck = decks?.items.find(item => item.id === id)

    if (editDeck) {
      setOpenEditNewDeckModal(true)
      setDeckId(id)
      setDeckName(editDeck.name)
      setDeckCover(editDeck.cover)
      setDeckIsPrivate(editDeck.isPrivate)
    }
  }
  const handleDeleteDeck = (deckId: string, name: string) => {
    setOpenDeleteDeckModal(true)
    setDeckId(deckId)
    setDeckName(name)
  }

  return (
    <Page mt={'36px'}>
      {openAddNewDeckModal && (
        <AddNewDeckModal
          open={openAddNewDeckModal}
          resetOrderBy={handleResetOrderBy}
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
          max={minMaxCardsData?.max ?? 0}
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
        headerColumns={decksTableColumns}
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
