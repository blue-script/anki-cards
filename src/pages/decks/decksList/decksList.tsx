import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import { AddNewDeckModal } from '@/entities/decks/addNewDeckModal/addNewDeckModal'
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { clsx } from 'clsx'

import s from './decksList.module.scss'

type SelectTab = 'All Cards' | 'My Cards'
export type SortOrder = 'updated-asc' | 'updated-desc'

export const DecksList = () => {
  const { data: minMaxCardsData } = useGetMinMaxCardsQuery()

  const [selectTab, setSelectTab] = useState<SelectTab>('My Cards')
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [minCardsCount, setMinCardsCount] = useState(minMaxCardsData?.min)
  const [maxCardsCount, setMaxCardsCount] = useState(minMaxCardsData?.max)
  const [currentPage, setCurrentPage] = useState(1)
  const debounceText = useDebounce<string>(search, 500)
  const [sortOrder, setSortOrder] = useState<SortOrder>('updated-desc')
  const [open, setOpen] = useState<boolean>(false)

  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: debounceText,
    ...(selectTab === 'My Cards' && { authorId: currentUserId }),
    maxCardsCount,
    minCardsCount,
    orderBy: sortOrder,
  })

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })

  const tabValueHandler = useCallback((value: string) => setSelectTab(value as SelectTab), [])

  const handleSearchChange = useCallback(
    (value: string) => {
      searchParams.set('search', value || '')
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleSortOrderToggle = useCallback(() => {
    setSortOrder(prevOrderBy => (prevOrderBy === 'updated-asc' ? 'updated-desc' : 'updated-asc'))
  }, [])

  const pageChangeHandler = useCallback((pageNumber: number) => setCurrentPage(pageNumber), [])

  const handleItemsPerPage = useCallback((numOfItems: string) => setItemsPerPage(+numOfItems), [])

  const sliderHandler = useCallback((data: [number, number]) => {
    setMinCardsCount(data[0])
    setMaxCardsCount(data[1])
  }, [])

  const handleClearFilter = useCallback(() => {
    reset()
    searchParams.delete('search')
    setSearchParams(searchParams)
  }, [reset, searchParams, setSearchParams])

  return (
    <>
      <Page className={s.wrapper} mt={'10px'}>
        {open && <AddNewDeckModal open={open} setOpen={setOpen} title={'Add new deck'} />}
        <div className={s.rowContainer}>
          <Typography as={'h1'} option={'h1'}>
            Decks List
          </Typography>
          <Button onClick={() => setOpen(!open)}>Add new deck</Button>
        </div>
        <form style={{ width: '100%' }}>
          <div className={clsx(s.rowContainer, s.rowHeight)}>
            <FormTextField
              control={control}
              name={'name'}
              onValueChange={handleSearchChange}
              placeholder={'Input search'}
              variant={'search'}
            />
            <TabSwitcher
              onValueChange={tabValueHandler}
              tabs={[
                { text: 'My Cards', value: 'My Cards' },
                { text: 'All Cards', value: 'All Cards' },
              ]}
              value={selectTab}
            />
            <Slider
              label={'Number of cards'}
              max={minMaxCardsData?.max || 10}
              min={minMaxCardsData?.min || 0}
              onValueChange={sliderHandler}
              value={[minCardsCount as number, maxCardsCount as number]}
            />
            <Button onClick={handleClearFilter} type={'button'} variant={'secondary'}>
              <TrashOutline /> Clear filter
            </Button>
          </div>
          <div className={s.rowContainer}>
            <DecksTable
              className={s.tableMargin}
              currentUserId={currentUserId}
              decks={decks?.items}
              onDeleteClick={id => deleteDeck({ id })}
              onEditClick={id => updateDeck({ id, name: 'hotPeppers new deck' })}
              onIconClick={handleSortOrderToggle}
            />
          </div>
        </form>
        <div className={s.rowContainer}>
          <Pagination
            currentPage={decks?.pagination.currentPage || 1}
            onPageChange={pageChangeHandler}
            pageSize={decks?.pagination.itemsPerPage || 10}
            setPageSize={numOfItems => handleItemsPerPage(numOfItems.toString())}
            style={{ marginTop: '15px' }}
            totalCount={decks?.pagination.totalItems || 50}
          />
        </div>
      </Page>
    </>
  )
}
