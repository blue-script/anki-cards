import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/features/auth/singInForm'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'
import { Page } from '@/shared'

import s from './signInPage.module.scss'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (data: LoginArgs) => {
    try {
      login(data).unwrap()
      navigate('/')
    } catch (err: any) {
      toast.error(err)
    }
  }

  return (
    <Page className={s.page} mt={'32px'}>
      <SignIn onSubmit={handleSubmit} />
    </Page>
  )
}
