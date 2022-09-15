import { NotFound } from '@/features/misc/routes/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
