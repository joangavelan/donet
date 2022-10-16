import {
  useColorMode,
  Flex,
  Box,
  Text,
  HStack,
  Icon,
  GridItem
} from '@chakra-ui/react'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import slugify from 'slugify'

const boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']

export const Sidebar = () => {
  const { colorMode } = useColorMode()

  const activeStyles = {
    background: `linear-gradient(to right, #FD7700, ${
      colorMode === 'light' ? '#ab8300' : '#FFD302'
    })`,
    backgroundClip: 'text',
    color: 'transparent'
  }

  return (
    <GridItem
      as='aside'
      area='aside'
      borderRight='1px'
      borderColor={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'}
    >
      <Logo />

      <Box p={7}>
        <HStack justifyContent='space-between' mb={7}>
          <Text as='h2' fontWeight='semibold' _hover={{ color: 'orange.400' }}>
            <NavLink to='/boards'>BOARDS</NavLink>
          </Text>
          <Icon
            as={AiOutlinePlusSquare}
            color={colorMode === 'light' ? 'blackAlpha.800' : 'whiteAlpha.800'}
            boxSize='1.3rem'
            cursor='pointer'
            _hover={{ color: 'orange.400' }}
            title='new board'
          />
        </HStack>

        <Flex as='ul' direction='column' gap={4}>
          {boards.map((board, index) => (
            <Box as='li' key={index}>
              <NavLink to={slugify(board, { lower: true })}>
                {({ isActive }) => (
                  <HStack _hover={{ color: '#FF6200' }}>
                    <Icon
                      as={MdOutlineSpaceDashboard}
                      color={isActive ? '#FF6200' : 'currentColor'}
                    />
                    <Text sx={isActive ? activeStyles : undefined}>
                      {board}
                    </Text>
                  </HStack>
                )}
              </NavLink>
            </Box>
          ))}
        </Flex>
      </Box>
    </GridItem>
  )
}
