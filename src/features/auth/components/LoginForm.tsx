import { Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Form, InputField } from '@/components/Form'
import * as z from 'zod'
import { useQueryClient } from 'react-query'
import { useSignIn } from '../hooks'

const schema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z
    .string()
    .trim()
    .min(1, 'Required')
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Max password length is 30 characters')
})

type FormValues = z.infer<typeof schema>

export const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signIn = useSignIn()

  return (
    <Stack gap={4}>
      <Form<FormValues>
        schema={schema}
        onSubmit={({ email, password }) => {
          signIn.mutate(
            { email, password },
            {
              onSuccess: (user) => {
                queryClient.setQueryData(['user'], user)
                navigate('/boards')
              }
            }
          )
        }}
      >
        {({ register, formState }) => (
          <Stack gap={2}>
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
            <Button type='submit' colorScheme='orange' isLoading={signIn.isLoading}>
              Sign In
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  )
}
