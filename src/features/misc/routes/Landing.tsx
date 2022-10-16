import {
  Flex,
  Box,
  Text,
  Link,
  Image,
  Icon,
  VStack,
  Button
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { AiOutlineHome, AiOutlineGithub } from 'react-icons/ai'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'

export const Landing = () => {
  const navigate = useNavigate()
  const user = useQueryClient().getQueryData('user')

  const handleStart = () => {
    if (user) {
      navigate('/boards')
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <Flex h='100vh'>
      <Helmet>
        <title>Donet | Task Management App</title>
      </Helmet>

      <VStack
        maxW='550px'
        h='min-content'
        mx='auto'
        pos='relative'
        top='18%'
        textAlign='center'
        gap={6}
        p={6}
      >
        <Box>
          <Text as='h1' fontSize={['3xl', '4xl']} fontWeight='extrabold'>
            Welcome to Donet!
          </Text>
          <Text fontSize={['md', 'lg']}>
            Your centralized task management app.
          </Text>
        </Box>

        <Image src='/checklist.png' w={[52, 60]} alt='checklist logo' />

        <Text fontSize={['md', 'lg']}>
          This project is part of a personal portfolio. You can find more
          projects like this on my personal{' '}
          <Link
            href='https://github.com/joangavelan'
            target='_blank'
            fontWeight='semibold'
          >
            github account
          </Link>
          .
        </Text>

        <Flex gap={[6, 8]}>
          <Button colorScheme='orange' onClick={handleStart}>
            <Icon as={AiOutlineHome} />
            <Text as='span' ml={1.5}>
              Get Started
            </Text>
          </Button>
          <Button
            as='a'
            href='https://github.com/joangavelan/donet'
            target='_blank'
          >
            <Icon as={AiOutlineGithub} />
            <Text as='span' ml={1.5}>
              Github Repo
            </Text>
          </Button>
        </Flex>
      </VStack>
    </Flex>
  )
}
