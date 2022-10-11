import * as React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Main, Sidebar } from '@/components/Layout'
import { Board } from '@/features/board/components'
import { Outlet } from 'react-router'
import { Welcome } from '@/features/misc/components/Welcome'
import { useDisclosure } from '@chakra-ui/react'
import { supabase } from '@/lib/supabase'

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = supabase.auth.user()

  React.useEffect(() => {
    async function updateUser() {
      const { error } = await supabase.auth.update({ data: { welcomed: true } })
      if (error) throw error
    }

    if (!user?.user_metadata.welcomed) {
      onOpen()
      void updateUser()
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
