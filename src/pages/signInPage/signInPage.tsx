import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/features/auth/singInForm'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'
import { Page } from '@/shared'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const navigate = useNavigate()
  //ohShit
  //const { data } = useMeQuery()

  const handleSignIn = async (data: LoginArgs) => {
    try {
      await signIn(data).unwrap()
      navigate('/')
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
    //ohShit
    // try {
    //   signIn(data)
    //   navigate('/')
    // } catch (error: any) {
    //   toast.error(error?.data?.message ?? 'Could not sign in')
    // }
  }

  //ohShit
  // if (data) {
  //   return <Navigate to={'/decks'} />
  // }

  return (
    <Page mt={'33px'}>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
