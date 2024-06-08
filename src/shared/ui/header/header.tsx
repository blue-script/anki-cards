import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
  const [headerData, setHeaderData] = useState<User | undefined>(data)

  useEffect(() => {
    setHeaderData(data)
  }, [data])

  const handleClick = () => {
    navigate('/')
  }

  const resetHeaderData = () => {
    setHeaderData(undefined)
  }

  return (
    <header className={s.header}>
      {!headerData ? (
        <img alt={'logo'} className={s.logo} src={logo} />
      ) : (
        <Button className={s.button} onClick={handleClick} variant={'link'}>
          <img alt={'logo'} className={s.logo} src={logo} />
        </Button>
      )}

      {!headerData && <Button variant={'primary'}>Sign in</Button>}
      {headerData && (
        <Profile
          avatar={headerData?.avatar as string}
          email={headerData?.email as string}
          id={headerData?.id as string}
          name={headerData?.name as string}
          resetHeaderData={resetHeaderData}
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
  resetHeaderData: () => void
}

export const Profile = ({ avatar, email, name, resetHeaderData }: ProfileProps) => {
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch (err: any) {
      if (err.status !== 401) {
        toast.error(err.message)
      }
    } finally {
      resetHeaderData()
      navigate('/login', { replace: true })
    }
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
