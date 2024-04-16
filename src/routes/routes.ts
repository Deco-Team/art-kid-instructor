import { lazy } from 'react'

const CoursesList = lazy(() => import('~/pages/CoursesList'))
const Login = lazy(() => import('~/pages/Login'))
const Dashboard = lazy(() => import('~/pages/Dashboard'))

const routes = {
  private: [
    {
      path: 'dashboard',
      component: Dashboard
    },
    {
      path: 'course-list',
      component: CoursesList
    }
  ],
  public: [
    {
      path: '/login',
      component: Login
    }
  ]
}

export default routes
