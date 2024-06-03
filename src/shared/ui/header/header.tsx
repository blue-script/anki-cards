import { ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/img/logo.png'
import { Button } from '@/shared'

import s from './header.module.scss'

type Props = {} & ComponentPropsWithoutRef<'header'>

export const Header = ({}: Props) => {
  const navigate = useNavigate()
  const handleClick = () => navigate('/login')

  return (
    <header className={s.header}>
      <img alt={'logo'} className={s.logo} src={logo} />
      <Button onClick={handleClick} variant={'secondary'}>
        Sign in
      </Button>
    </header>
  )
}
