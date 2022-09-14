import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const MainHeader = () => {
  return (
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
      <Text fontSize='xl' fontWeight='semibold'>
        Platform Launch
      </Text>
      <Flex align='center' gap={3}>
        <Button>Add New Task</Button>
        <Box fontSize='xl' cursor='pointer'>
          <BsThreeDotsVertical />
        </Box>
      </Flex>
    </Flex>
  )
}
