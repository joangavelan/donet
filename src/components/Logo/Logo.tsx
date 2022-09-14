import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'

export const Logo = () => {
  return (
    <Flex align='center' justify='center' w='full' h='100px' gap={1.5}>
      <Box boxSize={10}>
        <Image src='/tasks.png' alt='checklist' />
      </Box>
      <Text fontSize={30} fontWeight='semibold'>
        Donet
      </Text>
    </Flex>
  )
}
