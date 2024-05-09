import { CSSProperties } from 'react'

import { Button, Typography } from '@/components'
import { clsx } from 'clsx'

import s from './check-email.module.scss'

type Props = {
  className?: string
  style?: CSSProperties
}

export const CheckEmailForm = ({ className, style }: Props) => {
  return (
    <form className={clsx(s.form, className)} style={style}>
      <Typography as={'h1'} className={s.headerText} color={'light'} option={'h1'}>
        {'Check Email'}
      </Typography>
      <img
        alt={'Instructions email sent to your account'}
        className={s.pic}
        src={'src/assets/img/check-email.png'}
      />
      <Typography className={s.emailText} color={'light'} option={'body2'}>
        {'We’ve sent an Email with instructions to example@mail.com'}
      </Typography>
      <Button
        as={'a'}
        className={s.linkBtn}
        fullWidth
        href={'http://localhost:5173/signIn'}
        variant={'primary'}
      >
        Back to Sign In
      </Button>
    </form>
  )
}
