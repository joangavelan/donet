import { HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack gap={10} justify='space-between' align='top'>
      <Text as='h1' fontSize='xl' fontWeight='bold'>
        {children}
      </Text>

      <Icon
        as={BsThreeDotsVertical}
        color={useColorModeValue('', 'whiteAlpha.700')}
        cursor='pointer'
        _hover={{ color: 'orange.500' }}
        transform='auto'
        translateY='8px'
      />
    </HStack>
  )
}
