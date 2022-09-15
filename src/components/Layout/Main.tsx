import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams } from 'react-router'

type MainProps = {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
  const { board } = useParams()

  return (
    <Flex as='main' flex={1} direction='column'>
      {/* header */}
      <Flex
        as='header'
        align='center'
        justify='space-between'
        h='100px'
        px={7}
        bg='whiteAlpha.200'
        borderBottom='1px'
        borderColor='gray.200'
      >
        <Text fontSize='2xl' fontWeight='semibold'>
          {board ?? 'Welcome!'}
        </Text>
        <Flex align='center' gap={3}>
          <Button>Add New Task</Button>
          <Box fontSize='xl' cursor='pointer'>
            <BsThreeDotsVertical />
          </Box>
        </Flex>
      </Flex>
      {/* content */}
      <Box flex={1} p={5}>
        {children}
      </Box>
    </Flex>
  )
}
