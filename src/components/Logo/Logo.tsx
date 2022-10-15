import { Grid, HStack, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Grid placeItems='center' h='100px'>
      <HStack as={Link} to='/'>
        <Image src='/tasks.png' alt='checklist logo' boxSize={10} />
        <Text fontSize={30} fontWeight='semibold'>
          Donet
        </Text>
      </HStack>
    </Grid>
  )
}
