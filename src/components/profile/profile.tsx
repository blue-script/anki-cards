import { useState } from 'react'

import { Card, Typography } from '@/components'
import { ProfileAvatar } from '@/components/profile/profileAvatar/profileAvatar'
import { ProfileBody } from '@/components/profile/profileBody/profileBody'

import s from './profile.module.scss'

export type Props = {
  avatar: string
  email: string
  name: string
  onAvatarChange: (newAvatar: string) => void
  onLogout: () => void
  onNameChange: (newName: string) => void
}

export const Profile = ({ avatar, email, name, onAvatarChange, onLogout, onNameChange }: Props) => {
  const [editBodyStatus, setEditBodyStatus] = useState<boolean>(false)
  const editBodyStatusHandler = () => {
    setEditBodyStatus(prev => !prev)
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} color={'light'} option={'h1'}>
        Personal Information
      </Typography>

      <ProfileAvatar
        avatar={avatar}
        editBodyStatus={editBodyStatus}
        onAvatarChange={onAvatarChange}
      />

      <ProfileBody
        editBodyStatus={editBodyStatus}
        editBodyStatusHandler={editBodyStatusHandler}
        email={email}
        name={name}
        onLogout={onLogout}
        onNameChange={onNameChange}
      />
    </Card>
  )
}
