import { Button, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { InputField, Form } from '@/components/Form'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
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

type AuthFormProps = {
  method: 'signIn' | 'signUp'
  submitButtonText: string
}

export const AuthForm = ({ method, submitButtonText }: AuthFormProps) => {
  const showNotification = useNotification()
  const navigate = useNavigate()

  return (
    <Stack gap={4}>
      <Form<FormValues>
        schema={schema}
        onSubmit={async ({ email, password }) => {
          const { error } = await supabase.auth[method]({
            email,
            password
          })

          if (error) {
            showNotification({ type: 'error', message: error.message })
            throw error
          }

          navigate('/app')
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
              {submitButtonText}
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  )
}
