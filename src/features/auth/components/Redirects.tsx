import { Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type RedirectsProps = {
  question: string
  link: {
    href: string
    text: string
  }
}

export const Redirects = ({ question, link }: RedirectsProps) => {
  return (
    <VStack>
      <Text>{question}</Text>
      <Text
        as={Link}
        to={link.href}
        color='redirectLinkColor'
        fontWeight='semibold'
        _hover={{ textDecoration: 'underline' }}
      >
        {link.text}
      </Text>
    </VStack>
  )
}
