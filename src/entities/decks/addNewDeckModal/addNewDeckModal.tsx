import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ImageOutline } from '@/assets/icons'
import { FormValuesFromDeck, deckSchema } from '@/entities/decks/hook/schemas'
import { useModalKeyEvents } from '@/entities/decks/hook/useModalKeyEvents'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addNewDeckModal.module.scss'

type Props = {
  open: boolean
  resetOrderBy?: () => void
  setOpen: (open: boolean) => void
  title?: string
}

export const AddNewDeckModal = ({ open, resetOrderBy, setOpen, title }: Props) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromDeck>({
    defaultValues: { cover: undefined, isPrivate: true, name: '' },
    resolver: zodResolver(deckSchema),
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

  const addFormClickHandler = async (data: FormValuesFromDeck) => {
    if (resetOrderBy) {
      resetOrderBy()
    }
    const formData = new FormData()

    if (data.cover instanceof File) {
      formData.append('cover', data.cover)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))

    try {
      await createDeck(formData as unknown as CreateDeckArgs).unwrap()
      reset()
      setOpen(false)
      setPreviewImage(undefined) // Reset preview image after successful update
      toast.success('Deck added successfully!')
    } catch (error) {
      toast.error(`Failed to add deck`)
    }
  }

  useModalKeyEvents({
    onEnter: handleSubmit(addFormClickHandler),
    onEscape: () => setOpen(false),
    open,
  })

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
          firstButtonHandler={handleSubmit(addFormClickHandler)}
          firstButtonName={title}
          secondButtonHandler={() => setOpen(!open)}
          secondButtonName={'Cancel'}
        />
      </Modal>
    </form>
  )
}
