import { Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Header = ({ title }: { title: string }) => {
  return (
    <Stack as='header' gap={2}>
      <Link to='/'>
        <Image src='/checklist.png' w={{ base: 100, lg: 130 }} marginX='auto' />
      </Link>

      <Text as='h1' fontSize={{ base: '2xl', lg: '3xl' }} fontWeight='bold' textAlign='center'>
        {title}
      </Text>
    </Stack>
  )
}
