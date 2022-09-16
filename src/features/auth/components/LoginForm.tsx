import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  VStack,
  Icon,
  Flex,
  Box
} from '@chakra-ui/react'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { hasProperties } from '@/utils'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
})

type FormData = {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  React.useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  return (
    <Box>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <VStack as='form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={hasProperties(errors)}>
          <Flex direction='column' gap={4}>
            {/* google log in */}
            <Button
              w='full'
              bg='white'
              borderWidth={1}
              borderColor='gray.200'
              py={5}
              _hover={{
                backgroundColor: 'gray.100'
              }}
            >
              <Icon as={FcGoogle} boxSize={6} mr={2} />
              <Text>Continue with Google</Text>
            </Button>
            {/* email */}
            <Box>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input id='email' {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </Box>
            {/* password */}
            <Box>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input id='password' type='password' {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </Box>
            {/* submit button */}
            <Button type='submit' w='full' colorScheme='orange'>
              Sign In
            </Button>
          </Flex>
        </FormControl>
      </VStack>
      <VStack mt={5}>
        <Text>Don't have an account?</Text>
        <Text
          as={Link}
          to='../register'
          color='orange.600'
          _hover={{ textDecoration: 'underline' }}
        >
          Sign Up
        </Text>
      </VStack>
    </Box>
  )
}
