import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { useBoards } from '../hooks'

export const BoardList = () => {
  const { data: boards } = useBoards()

  const activeColor = useColorModeValue('orange.500', 'orange.200')

  return (
    <Stack as='ul' gap={3} overflowY='scroll'>
      {boards?.map(({ id, name, slug }) => (
        <Box as='li' key={id} minW={0} maxW='95%'>
          <NavLink to={slug}>
            {({ isActive }) => (
              <HStack
                _hover={{ color: 'orange.500' }}
                color={isActive ? activeColor : 'currentColor'}
              >
                <Icon as={MdOutlineSpaceDashboard} />
                <Text
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textTransform='capitalize'
                >
                  {name}
                </Text>
              </HStack>
            )}
          </NavLink>
        </Box>
      ))}
    </Stack>
  )
}
