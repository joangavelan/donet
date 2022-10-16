import * as React from 'react'
import { AppContainer, Header, Main, Sidebar } from '@/components/Layout'
import { Board } from '@/features/board/components'
import { Outlet } from 'react-router'
import { Boards, Welcome } from '@/features/misc/components'
import { useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'

const App = () => {
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
    <AppContainer>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>

      {/* welcome modal that pops up for new users */}
      <Welcome isOpen={isOpen} onClose={onClose} />
    </AppContainer>
  )
}

export const protectedRoutes = [
  {
    path: 'boards',
    element: <App />,
    children: [
      {
        path: '',
        element: <Boards />
      },
      {
        path: ':board',
        element: <Board />
      }
    ]
  }
]
