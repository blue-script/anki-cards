import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons'
import { FormValuesFromAddDeck } from '@/pages/decks/decksList/decksList'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewDeckModal.module.scss'

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

type AddNewDeckModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const AddNewDeckModal = ({ open, setOpen, title }: AddNewDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromAddDeck>({
    defaultValues: { cover: '', isPrivate: true, name: '' },
    resolver: zodResolver(newDeckSchema),
  })

  const imagePath = watch('cover')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('cover', file.name)
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

  return (
    <form>
      <Modal onOpenChange={() => setOpen(!open)} open={open} title={title}>
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
          secondButtonHandler={() => setOpen(!open)}
          secondButtonName={'Cancel'}
        />
      </Modal>
    </form>
  )
}
