import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'
import { Button, FormCheckbox, FormTextField, Modal } from '@/shared'
import { CountButton } from '@/shared/ui/modal/footer/footer'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editDeckModal.module.scss'

const updateDeckSchema = z.object({
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

type FormValuesFromEditDeck = z.infer<typeof updateDeckSchema>

type Props = {
  deckId: string
  name?: string
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}

export const EditDeckModal = ({ deckId, name, open, setOpen, title }: Props) => {
  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValuesFromEditDeck>({
    defaultValues: { cover: undefined, isPrivate: true, name: '' },
    resolver: zodResolver(updateDeckSchema),
  })

  const imagePath = watch('cover')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('cover', file)
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement

    if (fileInput) {
      fileInput.click()
    }
  }

  const editFormClickHandler = async (data: FormValuesFromEditDeck) => {
    // Упаковываем преобразуем данные из формы в объект
    const formData = new FormData()

    // Добавляем значения cover, name, isPrivate в formData
    if (data.cover) {
      formData.append('cover', data.cover)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))

    // Отправка данных на сервер
    try {
      // Здесь мы преобразуем FormData в обычный объект с помощью Object.fromEntries(formData.entries())
      // и передаем его вместе с deckId в функцию updateDeck.
      // Метод unwrap используется для обработки успешного разрешения промиса.
      await updateDeck({ id: deckId, ...Object.fromEntries(formData.entries()) }).unwrap()
      reset()
      setOpen(false)
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
          label={'New deck Name'}
          name={'name'}
          placeholder={name}
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
