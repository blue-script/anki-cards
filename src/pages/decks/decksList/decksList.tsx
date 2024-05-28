import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import { AddNewDeckModal } from '@/pages/decks/decksList/addNewDeckModal'
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import { Button, FormTextField, Page, Pagination, Slider, TabSwitcher, Typography } from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { clsx } from 'clsx'

import s from './decksList.module.scss'

type tabValueT = 'All Cards' | 'My Cards'
export type OrderType = 'updated-asc' | 'updated-desc'

export const DecksList = () => {
  const [tabValue, setTabValue] = useState<tabValueT>('My Cards')
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const debounceText = useDebounce<string>(search, 500)
  const [orderBy, setOrderBy] = useState<OrderType>('updated-desc')

  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: debounceText,
    ...(tabValue === 'My Cards' && { authorId: currentUserId }),
    maxCardsCount,
    minCardsCount,
    orderBy,
  })

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [open, setOpen] = useState<boolean>(false)
  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })

  // useEffect(() => {
  //   refetch()
  // }, [tabValue, itemsPerPage, currentPage, refetch])

  const tabValueHandler = (value: string) => setTabValue(value as tabValueT)

  const handleSearchChange = (value: string) => {
    searchParams.set('search', value || '')
    setSearchParams(searchParams)
  }

  const iconClickHandler = () => {
    orderBy === 'updated-asc' ? setOrderBy('updated-desc') : setOrderBy('updated-asc')
  }

  const pageChangeHandler = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleItemsPerPage = (numOfItems: string) => setItemsPerPage(+numOfItems)

  const sliderHandler = (data: [number, number]) => {
    setMinCardsCount(data[0])
    setMaxCardsCount(data[1])
  }

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
              value={tabValue}
            />
            <Slider
              label={'Number of cards'}
              max={10}
              min={0}
              onValueChange={sliderHandler}
              value={[minCardsCount, maxCardsCount]}
            />
            <Button
              onClick={() => {
                reset()
                searchParams.delete('search')
                setSearchParams(searchParams)
              }}
              variant={'secondary'}
            >
              <TrashOutline /> Clear filter
            </Button>
          </div>
          <div className={s.rowContainer}>
            <DecksTable
              className={s.tableMargin}
              currentUserId={currentUserId}
              decks={decks?.items}
              onDeleteClick={id => {
                deleteDeck({ id })
              }}
              onEditClick={id => updateDeck({ id, name: 'hotPeppers new deck' })}
              onIconClick={iconClickHandler}
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
