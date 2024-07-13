import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Edit2Outline, ImageOutline } from '@/assets/icons'
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
    defaultValues: { cover: null, isPrivate: true, name: '' },
    resolver: zodResolver(deckSchema),
  })

  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  const imagePath: File | null | string = watch('cover')

  useEffect(() => {
    // Clean up the object URL when component unmounts or previewImage changes
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  const handleFileAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (file) {
      setValue('cover', file)
      const newPreview = URL.createObjectURL(file)

      // Revoke the old object URL if it exists
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
      setPreviewImage(newPreview)
    }
  }

  const handleUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const addFormClickHandler = async (data: FormValuesFromDeck) => {
    if (resetOrderBy) {
      resetOrderBy()
    }

    try {
      await createDeck(data as unknown as CreateDeckArgs).unwrap()
      reset()
      setOpen(false)
      // Revoke the object URL after the form is successfully submitted
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
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
          onChange={handleFileAdd}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
        <Button className={s.uploadBtn} fullWidth onClick={handleUploadImage} variant={'secondary'}>
          {imagePath ? (
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
