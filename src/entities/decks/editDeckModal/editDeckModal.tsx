import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ImageOutline } from '@/assets/icons'
import { FormValuesFromDeck, deckSchema } from '@/entities/decks/hook/schemas'
import { useModalKeyEvents } from '@/entities/decks/hook/useModalKeyEvents'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './editDeckModal.module.scss'

type Props = {
  cover: string | undefined
  deckId: string
  isPrivate: boolean
  name: string
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const EditDeckModal = ({ cover, deckId, isPrivate, name, open, setOpen, title }: Props) => {
  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromDeck>({
    defaultValues: { cover: undefined, isPrivate, name },
    resolver: zodResolver(deckSchema),
  })

  const [previewImage, setPreviewImage] = useState<string | undefined>(cover)

  useEffect(() => {
    setValue('name', name || '')
    setValue('isPrivate', isPrivate)
    setPreviewImage(cover)
  }, [name, isPrivate, cover, setValue])

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

  const editFormClickHandler = async (data: FormValuesFromDeck) => {
    const formData = new FormData()

    if (data.cover instanceof File) {
      formData.append('cover', data.cover)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))

    try {
      await updateDeck({ body: formData, deckId }).unwrap()
      reset()
      setOpen(false)
      setPreviewImage(undefined) // Reset preview image after successful update
      toast.success('Deck edit successfully!')
    } catch (error) {
      toast.error(`Failed to edit deck`)
    }
  }

  useModalKeyEvents({
    onEnter: handleSubmit(editFormClickHandler),
    onEscape: () => setOpen(false),
    open,
  })

  return (
    <form>
      <Modal onOpenChange={() => setOpen(!open)} open={open} title={title}>
        <FormTextField
          control={control}
          fullWidth
          label={'New deck Name'}
          name={'name'}
          value={name}
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
          {imagePath && imagePath.name}
          {!imagePath && previewImage ? 'Change Image' : 'Upload Image'}
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
