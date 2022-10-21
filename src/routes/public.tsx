import { Login, Register } from '@/features/auth/routes'

export const publicRoutes = [
  {
    path: 'auth/login',
    element: <Login />
  },
  {
    path: 'auth/register',
    element: <Register />
  }
]
