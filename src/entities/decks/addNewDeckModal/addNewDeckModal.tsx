import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewDeckModal.module.scss'

const newDeckSchema = z.object({
  cover: z
    .instanceof(File)
    .refine(file => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'Must be a .jpeg or .png file.',
    })
    .optional(),
  isPrivate: z.boolean(),
  name: z
    .string()
    .min(3, { message: 'Deck Name must be at least 3 characters long' })
    .max(30, { message: 'Deck Name must not exceed 30 characters' }),
})

type FormValuesFromAddDeck = z.infer<typeof newDeckSchema>

type AddNewDeckModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const AddNewDeckModal = ({ open, setOpen, title }: AddNewDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromAddDeck>({
    defaultValues: { cover: undefined, isPrivate: true, name: '' },
    resolver: zodResolver(newDeckSchema),
  })

  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)

  const imagePath = watch('cover')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('cover', file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement

    if (fileInput) {
      fileInput.click()
    }
  }

  const editFormClickHandler = async (data: FormValuesFromAddDeck) => {
    const formData = new FormData()

    if (data.cover) {
      formData.append('cover', data.cover)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))

    try {
      await createDeck(formData as unknown as CreateDeckArgs).unwrap()
      reset()
      setOpen(false)
      setPreviewImage(undefined) // Reset preview image after successful update
    } catch (error) {
      console.error('Failed to update deck:', error)
    }
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
          {imagePath ? imagePath.name : 'Upload Image'}
        </Button>
        {previewImage && (
          <img alt={'Current cover'} className={s.currentCover} src={previewImage} />
        )}
        <FormCheckbox
          className={s.privateBox}
          control={control}
          label={'Private Deck'}
          name={'isPrivate'}
        />
        <Modal.Footer
          countButton={CountButton.Two}
          firstButtonHandler={handleSubmit(editFormClickHandler)}
          firstButtonName={title}
          secondButtonHandler={() => setOpen(!open)}
          secondButtonName={'Cancel'}
        />
      </Modal>
    </form>
  )
}
