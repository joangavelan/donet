import { Grid, HStack, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Grid placeItems='center' h='100px'>
      <HStack as={Link} to='/'>
        <Image src='/checklist.png' alt='checklist logo' boxSize={{ base: 8, lg: 10 }} />
        <Text fontSize={30} fontWeight='semibold' display={{ base: 'none', lg: 'inline-block' }}>
          Donet
        </Text>
      </HStack>
    </Grid>
  )
}
