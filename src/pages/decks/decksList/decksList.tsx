import { useCallback, useEffect, useState } from 'react'
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

type TabValue = 'All Cards' | 'My Cards'
type OrderType = 'created-asc' | 'created-desc'

export const DecksList = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('All Cards')
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 })
  const [cardsCountRange, setCardsCountRange] = useState<[number, number]>([1, 10])
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)
  const [sortOrder, setSortOrder] = useState<OrderType>('created-desc')
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const { data: decks, refetch } = useGetDecksQuery({
    currentPage: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,
    name: debouncedSearchQuery,
    ...(activeTab === 'My Cards' && { authorId: currentUserId }),
    maxCardsCount: cardsCountRange[1],
    minCardsCount: cardsCountRange[0],
    orderBy: sortOrder,
  })

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { control, reset } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })

  useEffect(() => {
    refetch()
  }, [activeTab, pagination, refetch])

  const handleTabChange = useCallback((value: string) => setActiveTab(value as TabValue), [])

  const handleSearchChange = useCallback(
    (value: string) => {
      searchParams.set('search', value || '')
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleSortOrderToggle = useCallback(() => {
    setSortOrder(prevSortOrder =>
      prevSortOrder === 'created-desc' ? 'created-asc' : 'created-desc'
    )
  }, [])

  const handlePageChange = useCallback((pageNumber: number) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }))
  }, [])

  const handleItemsPerPageChange = useCallback((numOfItems: string) => {
    setPagination(prev => ({ ...prev, itemsPerPage: +numOfItems }))
  }, [])

  const handleSliderChange = useCallback((data: [number, number]) => {
    setCardsCountRange(data)
  }, [])

  const handleClearFilter = useCallback(() => {
    reset()
    searchParams.delete('search')
    setSearchParams(searchParams)
  }, [reset, searchParams, setSearchParams])

  return (
    <>
      <Page className={s.wrapper} mt={'10px'}>
        {isModalOpen && (
          <AddNewDeckModal open={isModalOpen} setOpen={setModalOpen} title={'Add new deck'} />
        )}
        <div className={s.rowContainer}>
          <Typography as={'h1'} option={'h1'}>
            Decks List
          </Typography>
          <Button onClick={() => setModalOpen(!isModalOpen)}>Add new deck</Button>
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
              onValueChange={handleTabChange}
              tabs={[
                { text: 'My Cards', value: 'My Cards' },
                { text: 'All Cards', value: 'All Cards' },
              ]}
              value={activeTab}
            />
            <Slider
              label={'Number of cards'}
              max={10}
              min={0}
              onValueChange={handleSliderChange}
              value={cardsCountRange}
            />
            <Button onClick={handleClearFilter} variant={'secondary'}>
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
            onPageChange={handlePageChange}
            pageSize={decks?.pagination.itemsPerPage || 10}
            setPageSize={numOfItems => handleItemsPerPageChange(numOfItems.toString())}
            style={{ marginTop: '15px' }}
            totalCount={decks?.pagination.totalItems || 50}
          />
        </div>
      </Page>
    </>
  )
}
