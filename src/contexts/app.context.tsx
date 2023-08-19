import { createContext, useState } from 'react'
import { getAccessTokenFormLS, getProfileFormLS } from 'src/utils/auth'
import { User } from '../types/user.type'
import { ExtendedPurchase } from 'src/types/purchase.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFormLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFormLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProdiver = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        extendedPurchases,
        setExtendedPurchases,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
