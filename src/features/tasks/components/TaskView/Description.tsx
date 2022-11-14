import { useColorModeValue } from '@chakra-ui/color-mode'
import { Text } from '@chakra-ui/layout'

export const Description = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}>
      {children}
    </Text>
  )
}
