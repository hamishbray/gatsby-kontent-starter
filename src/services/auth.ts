import { useIdentityContext, User } from 'react-netlify-identity-widget'

export const isLoggedIn = (): boolean => useIdentityContext()?.isLoggedIn

export const user = (): User | undefined => useIdentityContext()?.user
