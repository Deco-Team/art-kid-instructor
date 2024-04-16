import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import './index.css'
import PrivateRoute from './routes/PrivateRoute'
import MainLayout from './components/layouts/MainLayout'
import NotFound from './pages/NotFound'
import AuthProvider from './contexts/AuthContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {routes.public.map((pages, i) => (
              <Route Component={pages.component} key={i} path={pages.path} />
            ))}
            <Route path='/' element={<MainLayout />}>
              {routes.private.map((pages, i) => (
                <Route element={<PrivateRoute Component={pages.component} />} key={i} path={pages.path} />
              ))}
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
