import * as React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Main, Sidebar } from '@/components/Layout'
import { Board } from '@/features/board/components'
import { Outlet } from 'react-router'
import { Welcome } from '@/features/misc/components'
import { useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'

export const App = () => {
  const { isOpen, onOpen: openWelcomeModal, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const newUser = queryClient.getQueryData('new-user')

  React.useEffect(() => {
    if (newUser) {
      openWelcomeModal()
      queryClient.removeQueries(['new-user'])
    }
  }, [])

  return (
    <>
      <Welcome isOpen={isOpen} onClose={onClose} />

      <Flex h='100vh'>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </Flex>
    </>
  )
}

export const protectedRoutes = [
  {
    path: 'app',
    element: <App />,
    children: [
      {
        path: '',
        element: <Box>Empty</Box>
      },
      {
        path: ':board',
        element: <Board />
      }
    ]
  }
]
