import { ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/img/logo.png'
import { useMeQuery } from '@/services/auth/auth.service'
import { Button, Typography } from '@/shared'

import s from './header.module.scss'

type Props = {} & ComponentPropsWithoutRef<'header'>

export const Header = ({}: Props) => {
  const { data: user } = useMeQuery()

  const navigate = useNavigate()
  const onLogin = () => navigate('/login')

  const onLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  return (
    <header className={s.header}>
      <img alt={'logo'} className={s.logo} src={logo} />

      {user ? (
        <>
          <img
            alt={'avatar'}
            src={(user.avatar && URL.createObjectURL(user.avatar)) || undefined}
          />
          <Typography option={'caption'}>{user.name}</Typography>
          <Button onClick={onLogout}>Logout</Button>
        </>
      ) : (
        <Button onClick={onLogin} variant={'secondary'}>
          Sign in
        </Button>
      )}
    </header>
  )
}
