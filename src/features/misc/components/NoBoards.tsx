import { useLogout } from '@/features/auth/hooks'
import { Button, Stack, Text, VStack } from '@chakra-ui/react'

export const NoBoards = () => {
  const logoutMutation = useLogout()

  return (
    <Stack h='100%' pos='relative'>
      <VStack gap={2.5} pos='relative' top='38%'>
        <VStack>
          <Text fontSize='2xl' fontWeight='semibold'>
            No board selected
          </Text>
          <Text fontSize='lg'>Haven't created any boards yet?</Text>
        </VStack>

        <Button colorScheme='orange'>Create New Board</Button>
      </VStack>

      <Button pos='absolute' right={0} onClick={() => logoutMutation.mutate()}>
        Logout
      </Button>
    </Stack>
  )
}
