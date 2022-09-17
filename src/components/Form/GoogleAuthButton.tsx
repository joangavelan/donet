import { Button, Icon, Text } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

type GoogleAuthButtonProps = {
  text: string
}

export const GoogleAuthButton = ({ text }: GoogleAuthButtonProps) => {
  return (
    <Button
      w='full'
      bg='white'
      borderWidth={1}
      borderColor='gray.200'
      py={5}
      _hover={{
        background: 'gray.100'
      }}
    >
      <Icon as={FcGoogle} boxSize={6} mr={2} />
      <Text color='gray.900'>{text}</Text>
    </Button>
  )
}
