import { AxiosError } from 'axios'
import { decodeJwt } from 'jose'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { IAuthContextProps, ILoginFormProps } from '~/interfaces/auth.interface'
import { IUser } from '~/interfaces/user.interface'
import { POST } from '~/utils/api.caller'
import { notifyError, notifySuccess } from '~/utils/toastify'

const initialContext: IAuthContextProps = {
  user: {
    side: '',
    iat: 0,
    exp: 0,
    name: '',
    sub: ''
  },
  idToken: null,
  login: async () => {},
  logout: async () => {
    return
  }
}

export const AuthContext = createContext<IAuthContextProps>(initialContext)

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true)
  const [idToken, setIdToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken') || ''
    if (storedToken) {
      setIdToken(storedToken)
      const decodedToken = decodeJwt(storedToken)
      setUser({
        side: decodedToken.side as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
    }
  }, [])

  useEffect(() => {
    if (idToken) {
      try {
        const decodedToken = decodeJwt(idToken)
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) navigate('/login')
        else
          setUser({
            side: decodedToken.side as string,
            iat: decodedToken.iat as number,
            exp: decodedToken.exp as number,
            name: decodedToken.name as string,
            sub: decodedToken.sub as string
          })
      } catch (error) {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  initialContext.login = async ({ email, password }: ILoginFormProps) => {
    try {
      setLoading(true)
      const { data } = await POST('auth/provider/login', { email, password }, {}, {})
      const token = data.data.accessToken
      setIdToken(token)
      const decodedToken = decodeJwt(token)
      localStorage.setItem('idToken', token)
      setUser({
        side: decodedToken.side as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
      notifySuccess('Login successfully')
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        notifyError(error.response.data.message)
      } else {
        notifyError('Error!')
      }
    }
    setLoading(false)
  }

  initialContext.logout = async () => {
    setLoading(true)
    try {
      localStorage.removeItem('idToken')
    } catch (error) {
      console.error()
    }
    setIdToken(null)
    setUser(undefined)
    setLoading(false)
  }

  initialContext.user = user
  initialContext.idToken = idToken

  return !loading ? (
    <AuthContext.Provider value={initialContext}>{children}</AuthContext.Provider>
  ) : (
    <Loading fullViewport={true} />
  )
}

export default AuthProvider
