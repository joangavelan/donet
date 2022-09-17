import { Button, Text, VStack, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InputField, GoogleAuthButton, Form } from '@/components/Form'
import * as z from 'zod'

const schema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(1, 'Required')
})

type FormValues = z.infer<typeof schema>

type AuthFormProps = {
  googleAuthButtonText: string
  submitButtonText: string
  question: string
  link: {
    text: string
    href: string
  }
}

export const AuthForm = ({
  googleAuthButtonText,
  submitButtonText,
  question,
  link
}: AuthFormProps) => {
  return (
    <Stack gap={4}>
      <GoogleAuthButton text={googleAuthButtonText} />

      <Form<FormValues>
        schema={schema}
        onSubmit={(values) => console.log(values)}
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
            <Button type='submit' w='full' colorScheme='orange'>
              {submitButtonText}
            </Button>
          </Stack>
        )}
      </Form>

      <VStack>
        <Text>{question}</Text>
        <Text
          as={Link}
          to={link.href}
          color='authButtonColor'
          _hover={{ textDecoration: 'underline' }}
        >
          {link.text}
        </Text>
      </VStack>
    </Stack>
  )
}
