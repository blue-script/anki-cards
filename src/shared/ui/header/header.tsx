import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { LogOut, PersonOutline } from '@/assets/icons'
import logo from '@/assets/img/logo.png'
import { User } from '@/services/auth/auth.types'
import { Button, Dropdown, Typography } from '@/shared'

import s from './header.module.scss'

type HeaderProps = {
  data: User | undefined
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ data }: HeaderProps) => {
  return (
    <header className={s.header}>
      <img alt={'logo'} className={s.logo} src={logo} />
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
  id: string
  name: string
}

export const Profile = ({ avatar, email, id, name }: ProfileProps) => {
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
              {id}
            </Typography>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>
            <LogOut />
            <Typography as={Link} option={'caption'} to={'/logout'}>
              Sign Out
            </Typography>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  )
}
