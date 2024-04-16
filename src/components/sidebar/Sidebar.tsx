import { Button, Paper } from '@mui/material'
import useAuth from '~/hooks/useAuth'

const Sidebar = () => {
  const { logout } = useAuth()

  return (
    <Paper
      sx={{
        height: '100vh',
        width: '18%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      elevation={6}
    >
      <Button onClick={logout} size='large' sx={{ my: 5 }} color='error' variant='text'>
        Logout
      </Button>
    </Paper>
  )
}

export default Sidebar
