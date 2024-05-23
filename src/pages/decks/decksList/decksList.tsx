import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { ImageOutline, TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import {
  Button,
  FormCheckbox,
  FormTextField,
  Modal,
  Page,
  Pagination,
  Slider,
  TabSwitcher,
  Typography,
} from '@/shared'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './decksList.module.scss'

type tabValueT = 'All Cards' | 'My Cards'

export const DecksList = () => {
  const [tabValue, setTabValue] = useState<tabValueT>('All Cards')
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [minCardsCount, setMinCardsCount] = useState(1)
  const [maxCardsCount, setMaxCardsCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const debounceText = useDebounce<string>(search, 500)
  const { data: decks, refetch } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: debounceText,
    ...(tabValue === 'My Cards' && { authorId: currentUserId }),
    maxCardsCount,
    minCardsCount,
  })
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const [open, setOpen] = useState<boolean>(false)

  const { control, handleSubmit, reset } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    // Refetch data when tab, itemsPerPage, currentPage changes
    refetch()
  }, [tabValue, itemsPerPage, currentPage, refetch])

  const tabValueHandler = (value: string) => {
    setTabValue(value as tabValueT)
  }

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const pageChangeHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    refetch()
  }

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = handleSubmit(data => {
    console.log('Form data:', data) // Added console.log to see the form data
  })

  const sliderHandler = (data: any) => {
    //console.log(data)
    setMinCardsCount(data[0])
    setMaxCardsCount(data[1])
  }

  return (
    <Page className={s.wrapper} mt={'10px'}>
      {open && <AddNewDeckModal open={open} setOpen={setOpen!} title={'Add new deck'} />}
      <div className={s.rowContainer}>
        <Typography as={'h1'} option={'h1'}>
          Decks List
        </Typography>
        <Button
          onClick={() => {
            setOpen(!open)
          }}
        >
          Add new deck
        </Button>
      </div>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
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
            onValueChange={sliderData => {
              sliderHandler(sliderData)
            }}
            value={[minCardsCount, maxCardsCount]}
          ></Slider>
          <Button
            icon
            onClick={() => {
              reset()
              searchParams.delete('search')
              setSearchParams(searchParams)
            }}
            variant={'secondary'}
          >
            <TrashOutline />
            Clear filter
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
            onEditClick={id => {
              updateDeck({ id, name: 'hotPeppers new deck' })
            }}
          />
        </div>
      </form>
      <div className={s.rowContainer}>
        <Pagination
          currentPage={decks?.pagination.currentPage || 1}
          onPageChange={pageNumber => pageChangeHandler(pageNumber)}
          pageSize={decks?.pagination.itemsPerPage || 10}
          setPageSize={numOfItems => handleItemsPerPage(numOfItems.toString())}
          style={{ marginTop: '15px' }}
          totalCount={decks?.pagination.totalItems || 50}
        />
      </div>
    </Page>
  )
}
type AddNewDeckModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

const newDeckSchema = z.object({
  cover: z
    .string()
    .optional()
    .refine(val => !val || /\.(jpg|jpeg|png|gif|bmp)$/.test(val), {
      message: 'Invalid image path. Must be a valid image format',
    }),
  isPrivate: z.boolean(),
  name: z
    .string()
    .min(3, { message: 'Deck Name must be at least 3 characters long' })
    .max(30, { message: 'Deck Name must not exceed 30 characters' }),
})

export type FormValuesFromAddDeck = z.infer<typeof newDeckSchema>

export const AddNewDeckModal = ({ open, setOpen, title }: AddNewDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromAddDeck>({
    defaultValues: {
      cover: '',
      isPrivate: true,
      name: '',
    },
    resolver: zodResolver(newDeckSchema),
  })

  const imagePath = watch('cover')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('cover', file.name) // Update form state with the file name
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement

    if (fileInput) {
      fileInput.click()
    }
  }

  const addFormClickHandler = (data: FormValuesFromAddDeck) => {
    createDeck(data)
    reset()
  }

  const openChangeHandler = () => {
    setOpen(!open)
  }

  return (
    <form>
      <Modal onOpenChange={openChangeHandler} open={open} title={title}>
        <FormTextField
          control={control}
          fullWidth
          label={'Deck Name'}
          name={'name'}
          placeholder={'DeckName'}
        />
        <input
          accept={'image/*'}
          id={'fileInput'}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          type={'file'}
        />
        <Button className={s.uploadBtn} fullWidth onClick={handleUploadClick} variant={'secondary'}>
          <ImageOutline />
          {imagePath || 'Upload Image'}
        </Button>
        <FormCheckbox
          className={s.privateBox}
          control={control}
          label={'Private Deck'}
          name={'isPrivate'}
        />
        <Modal.Footer
          countButton={CountButton.Two}
          firstButtonHandler={handleSubmit(addFormClickHandler)}
          firstButtonName={'Add New Deck'}
          secondButtonHandler={() => {
            openChangeHandler()
          }}
          secondButtonName={'Cancel'}
        />
      </Modal>
    </form>
  )
}
