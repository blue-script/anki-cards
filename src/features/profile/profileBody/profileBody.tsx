import { Edit2 } from '@/assets/icons'
import SvgLayers from '@/assets/icons/Layers'
import { Button, Typography } from '@/shared'
import { FormTextField } from '@/shared/ui'

import s from './profileBody.module.scss'

import { FormValues, useProfileBody } from './useProfileBody'

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

  const changeNameHandler = (data: FormValues) => {
    onNameChange(data.name)
    changeBodyStatusHandler()
  }

  const { control, handleSubmit } = useProfileBody({ name: name })

  return !bodyStatus ? (
    <>
      <div className={s.containerName}>
        <Typography as={'span'} className={s.name} option={'h2'}>
          {name}
        </Typography>
        <Button className={s.editNameButton} onClick={changeBodyStatusHandler}>
          <Edit2 />
        </Button>
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
        label={'Nickname'}
        name={'name'}
      />

      <Button fullWidth type={'submit'} variant={'primary'}>
        Save Changes
      </Button>
    </form>
  )
}
