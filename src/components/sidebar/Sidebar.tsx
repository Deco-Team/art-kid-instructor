import { Dashboard, Work } from '@mui/icons-material'
import { Button, Paper } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScreenPath } from '~/enums/screenpath.enum'
import useAuth from '~/hooks/useAuth'

const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarList = [
    {
      title: 'Dashboard',
      path: ScreenPath.DASHBOARD,
      icon: <Dashboard />
    },
    {
      title: 'Course',
      path: ScreenPath.COURSE,
      icon: <Work />
    }
  ]

  return (
    <Paper
      sx={{
        width: '18%',
        height: '100vh',
        display: 'flex',
        position: 'fixed',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 5
      }}
      elevation={6}
    >
      {sidebarList.map((items, i) => (
        <Button
          fullWidth
          size='large'
          startIcon={items.icon}
          sx={{ borderRadius: 0 }}
          variant={location.pathname === `/${items.path}` ? 'contained' : 'text'}
          onClick={() => navigate(items.path)}
          key={i}
        >
          {items.title}
        </Button>
      ))}
      <Button onClick={logout} size='large' sx={{ my: 5 }} color='error' variant='outlined'>
        Logout
      </Button>
    </Paper>
  )
}

export default Sidebar
