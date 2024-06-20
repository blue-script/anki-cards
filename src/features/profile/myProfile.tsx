import { useNavigate } from 'react-router-dom'

import { Profile } from '@/features/profile/profile'
import { useLogoutMutation, useMeEditMutation, useMeQuery } from '@/services/auth/auth.service'
import { LinearProgress } from '@/shared'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const [editMe] = useMeEditMutation()
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  if (isLoading) {
    return <LinearProgress isLoading={'loading'} />
  }

  if (!data) {
    return null // or some fallback UI
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleNameChange = async () => {
    if (data) {
      try {
        await editMe({ avatar: data.avatar, name: 'newName' })
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    }
  }

  const { avatar, email, name } = data

  return (
    <>
      <Profile
        avatar={avatar as string}
        email={email as string}
        name={name as string}
        onAvatarChange={() => {
          console.log('tryAvatarChange')
        }}
        onLogout={handleLogout}
        onNameChange={handleNameChange}
      />
    </>
  )
}
