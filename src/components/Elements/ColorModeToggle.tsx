import { Button, HStack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BsMoon, BsSun } from 'react-icons/bs'

export const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <HStack
      gap={1}
      bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
      w='max-content'
      h='max-content'
      borderRadius='md'
      paddingEnd={5}
      sx={{
        '& *': {
          fontSize: {
            base: '99%',
            lg: '100%'
          }
        }
      }}
    >
      <Button onClick={toggleColorMode}>
        {useColorModeValue(<BsMoon />, <BsSun fontSize='1.2rem' />)}
      </Button>
      <Text>{useColorModeValue('Light Mode', 'Dark Mode')}</Text>
    </HStack>
  )
}
