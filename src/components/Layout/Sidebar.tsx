import { Flex, Box, Text } from '@chakra-ui/layout'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { Icon } from '@chakra-ui/icon'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { FiPlusSquare } from 'react-icons/fi'
import slugify from 'slugify'

const boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']

export const Sidebar = () => {
  return (
    <Flex
      as='aside'
      h='full'
      w='30%'
      maxW='500px'
      direction='column'
      borderRight='1px'
      borderColor='gray.200'
    >
      <Logo />

      <Box p={7}>
        <Text as='h2' fontWeight='semibold' mb={7}>
          BOARDS
        </Text>

        <Flex as='ul' direction='column' gap={3} mb={3}>
          {boards.map((board, index) => (
            <Box as='li' key={index} _hover={{ color: '#C05521' }}>
              <NavLink to={slugify(board, { lower: true })}>
                <Flex alignItems='center' gap={2.5}>
                  <Icon as={MdOutlineSpaceDashboard} />
                  <Text>{board}</Text>
                </Flex>
              </NavLink>
            </Box>
          ))}
        </Flex>

        <Flex
          alignItems='center'
          gap={2.5}
          color='#DE6A1F'
          _hover={{ color: '#C05521' }}
          cursor='pointer'
          transitionDuration='150ms'
          fontWeight='medium'
        >
          <Icon as={FiPlusSquare} />
          <Text>Create New Board</Text>
        </Flex>
      </Box>
    </Flex>
  )
}
