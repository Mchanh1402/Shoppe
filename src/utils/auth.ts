import { User } from 'src/types/user.type'

export const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFormLS = () => localStorage.getItem('access_token') || ''

export const getProfileFormLS = () => {
  try {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
  } catch (error) {
    return null
  }
}

export const setProfiletoLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
