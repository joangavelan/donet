import type { Boards } from '@/types'
import { GridItem, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

export const BoardItem = ({ id, name, slug }: Boards['Row']) => {
  return (
    <GridItem
      as='li'
      key={id}
      textTransform='capitalize'
      borderRadius='lg'
      color='#1A202C'
      bg={useColorModeValue('#FFF1B8', '#d1aa61')}
      minH={0}
      minW={0}
      shadow='sm'
      _hover={{
        '.chakra-icon': {
          transform: 'translateX(5px)'
        }
      }}
    >
      <Stack as={NavLink} to={slug} p={{ base: 3.5, lg: 5 }}>
        <HStack>
          <Text fontWeight='semibold'>{name}</Text>
          <Icon as={AiOutlineArrowRight} transition='ease-in-out' transitionDuration='200ms' />
        </HStack>
      </Stack>
    </GridItem>
  )
}
