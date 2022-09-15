import { Box, Flex } from '@chakra-ui/layout'
import { Main, Sidebar } from '@/components/Layout'
import { Board } from '@/features/board/components'
import { Outlet } from 'react-router'

export const App = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Flex>
  )
}

export const protectedRoutes = [
  {
    path: 'app',
    element: <App />,
    children: [
      {
        path: '',
        element: <Box>Hola</Box>
      },
      {
        path: ':board',
        element: <Board />
      }
    ]
  }
]
