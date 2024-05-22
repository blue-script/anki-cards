import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { ImageOutline, TrashOutline } from '@/assets/icons'
import { DecksTable } from '@/entities/decks'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'
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
  const [createDeck] = useCreateDeckMutation()
  //const [updateDeck] = useUpdateDeckMutation()
  //const [deleteDeck] = useDeleteDeckMutation()
  const [tabValue, setTabValue] = useState<tabValueT>('All Cards')
  const [open, setOpen] = useState<boolean>(false)

  //console.log(open)

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const debounceText = useDebounce<string>(search, 500)

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data: decks } = useGetDecksQuery({ itemsPerPage, name: debounceText })

  const handleItemsPerPage = (numOfItems: string) => {
    setItemsPerPage(+numOfItems)
  }

  const onSubmit = handleSubmit(data => {
    console.log('Form data:', data) // Added console.log to see the form data
    createDeck(data)
      .unwrap()
      .then(() => {
        console.log('Deck created successfully')
      })
      .catch(error => {
        console.error('Failed to create deck:', error)
      })
  })

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
            onValueChange={(value: string) => {
              setTabValue(value as tabValueT)
            }}
            tabs={[
              { text: 'My Cards', value: 'My Cards' },
              { text: 'All Cards', value: 'All Cards' },
            ]}
            value={tabValue}
          />
          <Slider label={'Number of cards'} max={10} min={0} value={[2, 10]}></Slider>
          <Button icon variant={'secondary'}>
            <TrashOutline />
            Clear filter
          </Button>
        </div>
        <div className={s.rowContainer}>
          <DecksTable
            className={s.tableMargin}
            currentUserId={'f2be95b9-4d07-4751-a775-bd612fc9553a'}
            decks={decks?.items}
            // onDeleteClick={id => {
            //   deleteDeck({ id })
            // }}
            // onEditClick={id => {
            //   updateDeck({ id, name: 'hotPeppers new deck' })
            // }}
            onDeleteClick={() => {
              console.log('onDeleteClick')
            }}
            onEditClick={() => {
              console.log('onEditClick')
            }}
          />
        </div>
        <div className={s.rowContainer}>
          <Pagination
            currentPage={decks?.pagination.currentPage || 1}
            onPageChange={numOfItems => handleItemsPerPage(numOfItems.toString())}
            pageSize={decks?.pagination.itemsPerPage || 10}
            setPageSize={numOfItems => handleItemsPerPage(numOfItems.toString())}
            style={{ marginTop: '15px' }}
            totalCount={decks?.pagination.totalItems || 50}
          />
        </div>
      </form>
    </Page>
  )
}
type AddNewDeckModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

const newDeckSchema = z.object({
  deckName: z
    .string()
    .min(3, { message: 'Deck Name must be at least 3 characters long' })
    .max(30, { message: 'Deck Name must not exceed 30 characters' }),
  imagePath: z.string().regex(/\.(jpg|jpeg|png|gif|bmp)$/, {
    message: 'Invalid image path. Must be a valid image format',
  }),
  isPrivateDeck: z.boolean(),
})

export type FormValuesFromAddDeck = z.infer<typeof newDeckSchema>

export const AddNewDeckModal = ({ open, setOpen, title }: AddNewDeckModalProps) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromAddDeck>({
    defaultValues: {
      deckName: '',
      imagePath: '',
      isPrivateDeck: true,
    },
    resolver: zodResolver(newDeckSchema),
  })

  const imagePath = watch('imagePath')

  const submitHandler = handleSubmit(data => {
    console.log(data)
    //createDeck(data)
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('imagePath', file.name) // Update form state with the file name
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement

    if (fileInput) {
      fileInput.click()
    }
  }

  const addFormClickHandler = (data: FormValuesFromAddDeck) => {
    console.log(data)
    reset()
  }

  const openChangeHandler = () => {
    setOpen(!open)
  }

  return (
    <form onSubmit={submitHandler}>
      <Modal onOpenChange={openChangeHandler} open={open} title={title}>
        <FormTextField
          control={control}
          label={'Deck Name'}
          name={'deckName'}
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
          name={'isPrivateDeck'}
        />
        <Modal.Footer
          countButton={CountButton.Two}
          firstButtonHandler={handleSubmit(addFormClickHandler)}
          firstButtonName={'Add New Deck'}
          secondButtonHandler={() => {
            console.log('button #3 click')
          }}
          secondButtonName={'Cancel'}
        />
      </Modal>
    </form>
  )
}
