import { ComponentPropsWithoutRef } from 'react'

import logo from '@/assets/img/logo.png'
import { Button } from '@/shared'

import s from './header.module.scss'

type Props = {} & ComponentPropsWithoutRef<'header'>

export const Header = ({}: Props) => {
  return (
    <header className={s.header}>
      <img alt={'logo'} className={s.logo} src={logo} />
      <Button variant={'secondary'}>Sign in</Button>
    </header>
  )
}
