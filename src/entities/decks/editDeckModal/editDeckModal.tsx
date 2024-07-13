import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Edit2Outline, ImageOutline, TrashOutline } from '@/assets/icons'
import { FormValuesFromDeck, deckSchema } from '@/entities/decks/hook/schemas'
import { useModalKeyEvents } from '@/entities/decks/hook/useModalKeyEvents'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'
import { UpdateDeckArgs } from '@/services/decks/decks.types'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './editDeckModal.module.scss'

type Props = {
  cover?: null | string
  deckId: string
  isPrivate: boolean
  name: string
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const EditDeckModal = ({ cover, deckId, isPrivate, name, open, setOpen, title }: Props) => {
  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset, setValue } = useForm<FormValuesFromDeck>({
    defaultValues: { cover, isPrivate, name },
    resolver: zodResolver(deckSchema),
  })

  const [previewImage, setPreviewImage] = useState<null | string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue('name', name)
    setValue('isPrivate', isPrivate)
    if (cover) {
      setPreviewImage(cover)
    }
  }, [name, isPrivate, cover, setValue])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (file) {
      setValue('cover', file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const handleRemoveImage = () => {
    setValue('cover', null)
    if (previewImage != null) {
      URL.revokeObjectURL(previewImage)
    } // Revoke the previous previewImage URL
    setPreviewImage(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  const editFormClickHandler = async (data: FormValuesFromDeck) => {
    try {
      await updateDeck({ deckId, ...data } as unknown as UpdateDeckArgs).unwrap()
      reset()
      setOpen(false)
      if (previewImage != null) {
        URL.revokeObjectURL(previewImage)
      } // Revoke the previewImage URL after successful update
      setPreviewImage(null) // Reset preview image after successful update
      toast.success('Deck edit successfully!')
    } catch (error) {
      toast.error(`Failed to edit deck`)
    }
  }

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage) // Revoke the previewImage URL when the component unmounts
      }
    }
  }, [previewImage])

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
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
        <Button className={s.uploadBtn} fullWidth onClick={handleUploadImage} variant={'secondary'}>
          {previewImage ? (
            <>
              <Edit2Outline />
              Change Image
            </>
          ) : (
            <>
              <ImageOutline />
              Upload Image
            </>
          )}
        </Button>
        {previewImage && (
          <Button
            className={s.uploadBtn}
            fullWidth
            onClick={handleRemoveImage}
            variant={'secondary'}
          >
            <TrashOutline />
            Remove Image
          </Button>
        )}
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
