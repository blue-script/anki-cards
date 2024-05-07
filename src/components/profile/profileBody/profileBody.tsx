import { Edit2 } from '@/assets/icons'
import SvgLayers from '@/assets/icons/Layers'
import { Button, TextField, Typography } from '@/components'

import s from '@/components/profile/profileBody/profileBody.module.scss'

type Props = {
  editBodyStatus: boolean
  editBodyStatusHandler: () => void
  email: string
  name: string
  onLogout: () => void
  onNameChange: (newName: string) => void
}

export const ProfileBody = ({
  editBodyStatus,
  editBodyStatusHandler,
  email,
  name,
  onLogout,
  onNameChange,
}: Props) => {
  const logoutHandler = () => {
    onLogout()
  }
  const changeNameHandler = () => {
    editBodyStatusHandler()
  }

  const saveNameHandler = () => {
    onNameChange('name')
  }

  return !editBodyStatus ? (
    <>
      <div className={s.containerName}>
        <Typography as={'span'} className={s.name} color={'light'} option={'h2'}>
          {name}
        </Typography>
        <button className={s.editNameButton} onClick={changeNameHandler}>
          <Edit2 />
        </button>
      </div>

      <Typography as={'span'} className={s.email} color={'light'} option={'body2'}>
        {email}
      </Typography>
      <Button onClick={logoutHandler} variant={'secondary'}>
        <SvgLayers /> Logout
      </Button>
    </>
  ) : (
    <>
      <TextField className={s.newName} fullWidth label={'Nickmame'} />
      <Button fullWidth onClick={saveNameHandler} variant={'primary'}>
        Save Changes
      </Button>
    </>
  )
}
