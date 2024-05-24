import { DecksTable } from '@/entities'
import { Button, Page, Pagination, Slider, TabSwitcher, TextField, Typography } from '@/shared'

import s from './decks19.module.scss'

import SvgTrashOutline from './../../assets/icons/TrashOutline'

export const Decks19 = () => {
  const tabs = [
    { disabled: false, text: 'My Cards', value: 'My Cards' },
    { disabled: false, text: 'All Cards', value: 'All Cards' },
  ]
  const decks = [
    {
      author: {
        id: 'string',
        name: 'string',
      },
      cardsCount: 1,
      cover: 'string',
      created: 'string',
      id: 'string',
      isPrivate: false,
      name: 'string',
      updated: '2023-05-20T12:34:56',
      userId: 'string',
    },
    {
      author: {
        id: 'string',
        name: 'string',
      },
      cardsCount: 1,
      cover: 'string',
      created: 'string',
      id: 'string',
      isPrivate: false,
      name: 'string',
      updated: '2023-05-20T12:34:56',
      userId: 'string',
    },
  ]
  const pagination = {
    currentPage: 1,
    pageSize: 1,
    siblingCount: 1,
    totalCount: 4,
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
        <TextField variant={'search'} />
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
        <DecksTable decks={decks} onDeleteClick={id => id} onEditClick={id => id} />
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        onPageChange={(value: number) => value}
        pageSize={pagination.pageSize}
        setPageSize={(value: number) => value}
        siblingCount={pagination.siblingCount}
        totalCount={pagination.totalCount}
      />
    </Page>
  )
}
