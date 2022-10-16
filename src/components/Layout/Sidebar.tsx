import {
  useColorMode,
  Box,
  Text,
  HStack,
  Icon,
  GridItem,
  Button,
  useColorModeValue,
  Stack
} from '@chakra-ui/react'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import slugify from 'slugify'
import { BsMoon, BsSun } from 'react-icons/bs'

const boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']

export const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const activeStyles = {
    background: `linear-gradient(to right, #FD7700, ${
      colorMode === 'light' ? '#ab8300' : '#FFD302'
    })`,
    backgroundClip: 'text',
    color: 'transparent'
  }

  return (
    <GridItem
      display='grid'
      as='aside'
      area='aside'
      gridTemplateRows={'100px auto 1fr auto'}
      borderRight='1px'
      borderColor={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'}
      gap={7}
      px={7}
    >
      <Logo />

      <HStack justifyContent='space-between'>
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

      <Stack as='ul' gap={3} overflowY='scroll'>
        {boards.map((board, index) => (
          <Box as='li' key={index} minW={0} maxW='95%'>
            <NavLink to={slugify(board, { lower: true })}>
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
                    sx={isActive ? activeStyles : undefined}
                  >
                    {board}
                  </Text>
                </HStack>
              )}
            </NavLink>
          </Box>
        ))}
      </Stack>

      <HStack
        gap={1}
        bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
        maxW='max-content'
        borderRadius='md'
        mb={7}
        paddingEnd={5}
      >
        <Button onClick={toggleColorMode}>
          {useColorModeValue(<BsMoon />, <BsSun fontSize='1.2rem' />)}
        </Button>
        <p>{useColorModeValue('Light Mode', 'Dark Mode')}</p>
      </HStack>
    </GridItem>
  )
}
