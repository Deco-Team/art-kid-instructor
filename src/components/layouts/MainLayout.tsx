import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative'
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '80%',
          marginLeft: '15%'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
