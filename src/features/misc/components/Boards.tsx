import { Button, Text, VStack } from '@chakra-ui/react'

export const Boards = () => {
  return (
    <VStack gap={2.5} pos='relative' top='32.5%'>
      <VStack>
        <Text fontSize='2xl' fontWeight='semibold'>
          No boards here
        </Text>
        <Text fontSize='lg'>Haven't created any boards yet?</Text>
      </VStack>

      <Button colorScheme='orange'>Create New Board</Button>
    </VStack>
  )
}
