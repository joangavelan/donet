import { Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Form, InputField } from '@/components/Form'
import * as z from 'zod'
import { useMutation, useQueryClient } from 'react-query'
import { signIn } from '../api/signIn'
import type { AuthApiError } from '@supabase/supabase-js'
import { useNotification } from '@/hooks/useNotification'

const schema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z
    .string()
    .trim()
    .min(1, 'Required')
    .min(6, 'Password must be at least 6 characters')
})

type FormValues = z.infer<typeof schema>

export const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const loginMutation = useMutation(signIn)
  const showNotification = useNotification()

  return (
    <Stack gap={4}>
      <Form<FormValues>
        schema={schema}
        onSubmit={async ({ email, password }) => {
          await loginMutation.mutateAsync(
            { email, password },
            {
              onError: (error) => {
                const { message } = error as AuthApiError
                showNotification({ type: 'error', message })
              },
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
            <Button
              type='submit'
              colorScheme='orange'
              isLoading={formState.isSubmitting}
            >
              Sign In
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  )
}
