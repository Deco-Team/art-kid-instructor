import { lazy } from 'react'
import { ScreenPath } from '~/enums/screenpath.enum'

const CourseDetail = lazy(() => import('~/pages/CourseDetail'))
const NotFound = lazy(() => import('~/pages/NotFound'))
const CoursesList = lazy(() => import('~/pages/CoursesList'))
const Login = lazy(() => import('~/pages/Login'))
const Dashboard = lazy(() => import('~/pages/Dashboard'))

const routes = {
  private: [
    {
      path: ScreenPath.DASHBOARD,
      component: Dashboard
    },
    {
      path: ScreenPath.COURSE,
      component: CoursesList
    },
    {
      path: ScreenPath.COURSE_DETAIL,
      component: CourseDetail
    },
    {
      path: '*',
      component: NotFound
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
