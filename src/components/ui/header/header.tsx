import logo from '@/assets/img/logo.png'

import s from './header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <img alt={'logo'} className={s.logo} src={logo} />
    </header>
  )
}
