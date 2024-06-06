export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type User = {
  avatar: File | null
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
