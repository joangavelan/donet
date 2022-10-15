import { Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Header = ({ title }: { title: string }) => {
  return (
    <Stack as='header'>
      <Link to='/'>
        <Image src='/checklist.png' w={130} marginX='auto' />
      </Link>

      <Text as='h1' fontSize='3xl' fontWeight='bold' textAlign='center'>
        {title}
      </Text>
    </Stack>
  )
}
