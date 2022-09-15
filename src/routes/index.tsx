import { Landing } from '@/features/misc'
import { useRoutes } from 'react-router'
import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

export const AppRoutes = () => {
  const user = false

  const commonRoutes = [{ path: '/', element: <Landing /> }]

  const routes = user ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
