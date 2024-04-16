import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  )
}

export default MainLayout
