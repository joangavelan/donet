import { Button, Text, Stack, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { InputField, Form } from '@/components/Form'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/hooks/useNotifications'

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
  submitButtonText: string
  question: string
  toggleLink: { text: string; href: string }
  method: 'signIn' | 'signUp'
}

export const AuthForm = ({
  submitButtonText,
  question,
  toggleLink,
  method
}: AuthFormProps) => {
  const navigate = useNavigate()
  const showNotification = useNotifications()

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
            showNotification('error', error.message)
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

      <VStack>
        <Text>{question}</Text>
        <Text
          as={Link}
          to={toggleLink.href}
          color='authButtonColor'
          _hover={{ textDecoration: 'underline' }}
        >
          {toggleLink.text}
        </Text>
      </VStack>
    </Stack>
  )
}
