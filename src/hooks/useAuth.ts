import { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { IAuthContextProps } from '~/interfaces/auth.interface'

const useAuth = () => {
  return useContext(AuthContext) as IAuthContextProps
}

export default useAuth
