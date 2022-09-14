import { Flex, Box, Text } from '@chakra-ui/layout'
import { Logo } from '../Logo'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <Flex
      as='aside'
      h='full'
      w='30%'
      maxW='500px'
      direction='column'
      borderRight='1px'
      borderColor='gray.200'
    >
      <Logo />
      <Box p={7}>
        <Text fontWeight='semibold' mb={7}>
          BOARDS
        </Text>
        <Flex direction='column' gap={4}>
          <Link to='app/platform-launch'>Platform Launch</Link>
          <Link to='app/marketing-plan'>Marketing Plan</Link>
          <Link to='app/roadmap'>Roadmap</Link>
        </Flex>
      </Box>
    </Flex>
  )
}
