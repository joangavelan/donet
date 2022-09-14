import { Board } from '@/features/Board/components'
import { Box } from '@chakra-ui/layout'
import { Route, Routes } from 'react-router'
import { MainHeader } from './MainHeader'

export const Main = () => {
  return (
    <Box as='main' flex={1}>
      <MainHeader />
      <Routes>
        <Route path='app/:board' element={<Board />} />
      </Routes>
    </Box>
  )
}
