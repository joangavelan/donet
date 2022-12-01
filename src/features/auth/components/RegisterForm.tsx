import { Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Form, InputField } from '@/components/Form'
import * as z from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSignUp } from '../hooks'

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Required')
    .min(3, 'Full name must have at least 3 characters')
    .max(60, 'Max full name length is 60 characters'),
  email: z.string().min(1, 'Required').email(),
  password: z
    .string()
    .trim()
    .min(1, 'Required')
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Max password length is 30 characters')
})

type FormValues = z.infer<typeof schema>

export const RegisterForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signUp = useSignUp()

  return (
    <Stack gap={4}>
      <Form<FormValues>
        schema={schema}
        onSubmit={({ fullName, email, password }) => {
          signUp.mutate(
            { fullName, email, password },
            {
              onSuccess: (user) => {
                queryClient.setQueryData(['user'], user)
                queryClient.setQueryData(['isNewUser'], true)
                navigate('/boards')
              }
            }
          )
        }}
      >
        {({ register, formState }) => (
          <Stack gap={2}>
            <InputField
              id='fullName'
              label='Full Name'
              error={formState.errors.fullName}
              registration={register('fullName')}
              type='text'
            />
            <InputField
              id='email'
              label='Email Address'
              error={formState.errors.email}
              registration={register('email')}
              type='email'
            />
            <InputField
              id='password'
              label='Password'
              error={formState.errors.password}
              registration={register('password')}
              type='password'
            />
            <Button type='submit' colorScheme='orange' isLoading={signUp.isLoading}>
              Sign Up
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  )
}
