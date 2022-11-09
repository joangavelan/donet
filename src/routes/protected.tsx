import { AppContainer, Header, Main, Sidebar } from '@/components/Layout'
import { Outlet } from 'react-router'
import { Boards, Board } from '@/features/boards/routes'

const App = () => {
  return (
    <AppContainer>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
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
        path: ':slug',
        element: <Board />
      }
    ]
  }
]
