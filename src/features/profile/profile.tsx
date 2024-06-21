import { useState } from 'react'

import { useMeEditMutation } from '@/services/auth/auth.service'
import { Card, Typography } from '@/shared'

import s from './profile.module.scss'

import { ProfileAvatar } from './profileAvatar'
import { ProfileBody } from './profileBody'

export type Props = {
  avatar: string
  email: string
  name: string
  onAvatarChange: (newAvatar: string) => void
  onLogout: () => void
  onNameChange: (newName: string) => void
}

export const Profile = ({ avatar, email, name, onLogout }: Props) => {
  const [bodyStatus, setBodyStatus] = useState<boolean>(false)
  const [meEdit] = useMeEditMutation()

  const setBodyStatusHandler = () => {
    setBodyStatus(prev => !prev)
  }

  const onAvatarChange = (newAvatar: File | string) => {
    meEdit({ avatar: newAvatar })
  }

  const onNameChange = (newName: string) => {
    meEdit({ name: newName })
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} option={'h1'}>
        Personal Information
      </Typography>

      <ProfileAvatar avatar={avatar} editBodyStatus={bodyStatus} onAvatarChange={onAvatarChange} />

      <ProfileBody
        bodyStatus={bodyStatus}
        email={email}
        name={name}
        onLogout={onLogout}
        onNameChange={onNameChange}
        setBodyStatusHandler={setBodyStatusHandler}
      />
    </Card>
  )
}
