import { Typography } from '@mui/material'
import { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard'
    return () => {}
  }, [])

  return (
    <Typography variant='h3' m={3} fontWeight={700}>
      🚧 UNDER MAINTENANCE 🚧
    </Typography>
  )
}

export default Dashboard
