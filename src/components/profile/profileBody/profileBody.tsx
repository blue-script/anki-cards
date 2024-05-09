import { useForm } from 'react-hook-form'

import { Edit2 } from '@/assets/icons'
import SvgLayers from '@/assets/icons/Layers'
import { Button, Typography } from '@/components'
import { FormTextField } from '@/components/ui/form/form-textfield'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/profile/profileBody/profileBody.module.scss'

type Props = {
  bodyStatus: boolean
  email: string
  name: string
  onLogout: () => void
  onNameChange: (newName: string) => void
  setBodyStatusHandler: () => void
}

export const ProfileBody = ({
  bodyStatus,
  email,
  name,
  onLogout,
  onNameChange,
  setBodyStatusHandler,
}: Props) => {
  const logoutHandler = () => {
    onLogout()
  }
  const changeBodyStatusHandler = () => {
    setBodyStatusHandler()
  }

  const changeNameHandler = () => {
    onNameChange('name')
  }

  const nicknameSchema = z.object({
    nickname: z.string().min(3, { message: 'Nickname must be at least 3 characters long' }),
  })

  type FormValues = z.infer<typeof nicknameSchema>

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
    },
    resolver: zodResolver(nicknameSchema),
  })

  return !bodyStatus ? (
    <>
      <div className={s.containerName}>
        <Typography as={'span'} className={s.name} option={'h2'}>
          {name}
        </Typography>
        <button className={s.editNameButton} onClick={changeBodyStatusHandler}>
          <Edit2 />
        </button>
      </div>

      <Typography as={'span'} className={s.email} option={'body2'}>
        {email}
      </Typography>
      <Button onClick={logoutHandler} variant={'secondary'}>
        <SvgLayers /> Logout
      </Button>
    </>
  ) : (
    <form onSubmit={handleSubmit(changeNameHandler)}>
      <FormTextField
        className={s.newName}
        control={control}
        fullWidth
        label={'Nickmame'}
        name={'nickname'}
      />
      <Button as={'a'} fullWidth type={'submit'} variant={'primary'}>
        Save Changes
      </Button>
    </form>
  )
}
