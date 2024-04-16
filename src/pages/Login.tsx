import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ScreenPath } from '~/enums/screenpath.enum'
import { UserRole } from '~/enums/user.enum'
import useAuth from '~/hooks/useAuth'
import { ILoginFormProps } from '~/interfaces/auth.interface'
import loginSchema from '~/validations/auth'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormProps>({
    resolver: yupResolver(loginSchema)
  })
  const { idToken, login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Login'
    return () => {}
  }, [])

  useEffect(() => {
    if (user?.side === UserRole.PROVIDER) {
      navigate('/' + ScreenPath.DASHBOARD)
    } else {
      navigate('/' + ScreenPath.LOGIN)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          background: 'url("/login.jpg")',
          height: '100vh',
          objectFit: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          filter: 'brightness(45%)',
          zIndex: -99
        }}
      ></Box>
      <Paper
        elevation={6}
        sx={{
          width: '30%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 5
        }}
      >
        <Typography sx={{ filter: 'brightness(100%)' }} variant='h4' marginBottom={5} fontWeight={700} align='center'>
          Welcome back, instructor!
        </Typography>

        <form onSubmit={handleSubmit(login)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextField
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...register('email')}
              fullWidth
              label='Email'
              variant='standard'
              sx={{ mb: 5 }}
            />
            <TextField
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register('password')}
              fullWidth
              label='Password'
              variant='standard'
              type='password'
              sx={{ mb: 5 }}
            />
            <Button size='large' color='success' variant='outlined' sx={{ margin: '0 auto' }} type='submit'>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
