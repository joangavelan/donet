import { Flex } from '@chakra-ui/layout'
import { Logo } from '../Logo'

export const Sidebar = () => {
  return (
    <Flex as='aside' h='full' w='30%' borderRight='1px' borderColor='gray.200'>
      <Logo />
    </Flex>
  )
}
