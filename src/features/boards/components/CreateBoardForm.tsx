import { Form, InputField } from '@/components/Form'
import { useNotification } from '@/hooks/useNotification'
import { Button, HStack } from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { useQueryClient } from 'react-query'
import slugify from 'slugify'
import * as z from 'zod'
import { useCreateBoard } from '../hooks'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Required')
    .regex(/^[a-zA-Z0-9 ]*$/, 'Only letters and numbers are allowed')
})

type FormValues = z.infer<typeof schema>

type CreateBoardFormProps = {
  closeModal: () => void
}

export const CreateBoardForm = ({ closeModal }: CreateBoardFormProps) => {
  const queryClient = useQueryClient()
  const userId = (queryClient.getQueryData(['user']) as User).id
  const createBoardMutation = useCreateBoard()
  const showNotification = useNotification()

  return (
    <Form<FormValues>
      schema={schema}
      onSubmit={({ name }) => {
        const slug = slugify(name, { lower: true })

        createBoardMutation.mutate(
          { name, slug, user_id: userId },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(['boards'])
              showNotification({
                type: 'success',
                message: 'New board created'
              })
              closeModal()
            }
          }
        )
      }}
    >
      {({ register, formState }) => (
        <HStack gap={2} alignItems='start'>
          <InputField
            id='name'
            placeholder='e.g: Platform Launch'
            registration={register('name')}
            error={formState.errors.name}
            type='text'
          />
          <Button
            type='submit'
            isLoading={createBoardMutation.isLoading}
            colorScheme='orange'
            px={7}
          >
            Create Board
          </Button>
        </HStack>
      )}
    </Form>
  )
}
