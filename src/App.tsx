import { Flex } from '@chakra-ui/layout'
import { Main, Sidebar } from './components/Layout'

const App = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Main />
    </Flex>
  )
}

export default App
