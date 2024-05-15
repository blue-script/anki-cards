import { useState } from 'react'

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

export const Profile = ({ avatar, email, name, onAvatarChange, onLogout, onNameChange }: Props) => {
  const [bodyStatus, setBodyStatus] = useState<boolean>(false)
  const setBodyStatusHandler = () => {
    setBodyStatus(prev => !prev)
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
