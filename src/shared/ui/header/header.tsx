import { ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { LogOut, PersonOutline } from '@/assets/icons'
import logo from '@/assets/img/logo.png'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { User } from '@/services/auth/auth.types'
import { Button, Dropdown, Typography } from '@/shared'

import s from './header.module.scss'

type HeaderProps = {
  data: User | undefined
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ data }: HeaderProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <header className={s.header}>
      {!localStorage.getItem('accessToken') ? (
        <img alt={'logo'} className={s.logo} src={logo} />
      ) : (
        <Button onClick={handleClick}>
          <img alt={'logo'} className={s.logo} src={logo} />
        </Button>
      )}

      {data === undefined && <Button variant={'primary'}>Sign in</Button>}
      {data?.id && (
        <Profile
          avatar={data?.avatar as string}
          email={data?.email as string}
          id={data?.id as string}
          name={data?.name as string}
        />
      )}
    </header>
  )
}

type ProfileProps = {
  avatar: string
  email: string
  id?: string
  name: string
}

export const Profile = ({ avatar, email, name }: ProfileProps) => {
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <Dropdown.Root modal={false}>
        <Dropdown.Trigger asChild>
          <div className={s.userWrapper}>
            <Typography option={'subtitle1'}>{name}</Typography>
            <img alt={'profile image'} className={s.profileImage} src={avatar} />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content align={'end'} sideOffset={3}>
          <Dropdown.Label>
            <img alt={'profile image'} className={s.profileImage} src={avatar} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography as={'span'} option={'caption'}>
                {name}
              </Typography>
              <Typography as={'span'} option={'caption'}>
                {email}
              </Typography>
            </div>
          </Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Item>
            <PersonOutline />
            <Typography as={'span'} option={'caption'}>
              My Profile
            </Typography>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>
            <LogOut />
            <Button className={s.btnLogout} onClick={handleLogout} variant={'link'}>
              Sign Out
            </Button>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  )
}
