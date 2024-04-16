import { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard'
    return () => {}
  }, [])

  return <div>Dashboard</div>
}

export default Dashboard
