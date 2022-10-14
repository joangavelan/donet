import { Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Form, InputField } from '@/components/Form'
import * as z from 'zod'
import { useMutation, useQueryClient } from 'react-query'
import { AuthApiError } from '@supabase/supabase-js'
import { useNotification } from '@/hooks/useNotification'
import { signUp } from '../api/signUp'

const schema = z.object({
  fullName: z.string().trim().min(1, 'Required'),
  email: z.string().min(1, 'Required').email(),
  password: z
    .string()
    .trim()
    .min(1, 'Required')
    .min(6, 'Password must be at least 6 characters')
})

type FormValues = z.infer<typeof schema>

export const RegisterForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const registerMutation = useMutation(signUp)
  const showNotification = useNotification()

  return (
    <Stack gap={4}>
      <Form<FormValues>
        schema={schema}
        onSubmit={async ({ fullName, email, password }) => {
          await registerMutation.mutateAsync(
            { fullName, email, password },
            {
              onError: (error) => {
                const { message } = error as AuthApiError
                showNotification({ type: 'error', message })
              },
              onSuccess: (user) => {
                queryClient.setQueryData(['user'], user)
                queryClient.setQueryData(['new-user'], true)
                navigate('/app')
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
            <Button
              type='submit'
              colorScheme='orange'
              isLoading={formState.isSubmitting}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  )
}
