import { Form, InputField } from '@/components/Form'
import { Button, HStack } from '@chakra-ui/react'
import type { DeepPartial, SubmitHandler } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(25, 'Max length is 25 characters')
    .regex(/^[a-zA-Z0-9 ]*$/, 'Only letters and numbers')
})

type FormValues = z.infer<typeof schema>

type SingleInputFormProps = {
  onSubmit: SubmitHandler<FormValues>
  submitButtonText: string
  placeholderText?: string
  defaultValues?: DeepPartial<FormValues>
  isLoading?: boolean
}

export const SingleInputForm = ({
  onSubmit,
  placeholderText,
  submitButtonText,
  defaultValues,
  isLoading
}: SingleInputFormProps) => {
  return (
    <Form<FormValues> schema={schema} onSubmit={onSubmit} options={{ defaultValues }}>
      {({ register, formState }) => (
        <HStack align='start' gap={2}>
          <InputField
            id='name'
            placeholder={placeholderText}
            registration={register('name')}
            error={formState.errors.name}
            type='text'
          />
          <Button type='submit' colorScheme='orange' isLoading={isLoading} px={8}>
            {submitButtonText}
          </Button>
        </HStack>
      )}
    </Form>
  )
}
