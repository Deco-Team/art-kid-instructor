import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import './index.css'
import MainLayout from './components/layouts/MainLayout'
import AuthProvider from './contexts/AuthContext'
import { Suspense } from 'react'
import Loading from './components/loading/Loading'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.public.map((pages, i) => (
              <Route Component={pages.component} key={i} path={pages.path} />
            ))}
            <Route path='/' element={<MainLayout />}>
              {routes.private.map((pages, i) => (
                <Route Component={pages.component} key={i} path={pages.path} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
