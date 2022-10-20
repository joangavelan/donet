import { Box, HStack, Icon, Stack, Text, useColorMode } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { useBoards } from '../hooks'

export const BoardList = () => {
  const { colorMode } = useColorMode()
  const { data: boards } = useBoards()

  const activeStyles = {
    background: `linear-gradient(to right, #FD7700, ${
      colorMode === 'light' ? '#ab8300' : '#FFD302'
    })`,
    backgroundClip: 'text',
    color: 'transparent'
  }

  return (
    <Stack as='ul' gap={3} overflowY='scroll'>
      {boards?.map(({ id, name, slug }) => (
        <Box as='li' key={id} minW={0} maxW='95%'>
          <NavLink to={slug}>
            {({ isActive }) => (
              <HStack _hover={{ color: '#FF6200' }}>
                <Icon
                  as={MdOutlineSpaceDashboard}
                  color={isActive ? '#FF6200' : 'currentColor'}
                />
                <Text
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textTransform='capitalize'
                  sx={isActive ? activeStyles : undefined}
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
