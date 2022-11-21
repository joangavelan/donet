import { Form, InputField } from '@/components/Form'
import { useUser } from '@/features/auth/hooks'
import { useNotification } from '@/hooks'
import { Button, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import * as z from 'zod'
import { useCreateBoard } from '../hooks'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(30, 'Max length is 30 characters')
    .regex(/^[a-zA-Z0-9 ]*$/, 'Only letters and numbers')
})

type FormValues = z.infer<typeof schema>

type CreateBoardFormProps = {
  closeModal: () => void
}

export const CreateBoardForm = ({ closeModal }: CreateBoardFormProps) => {
  const user = useUser()
  const createBoard = useCreateBoard()
  const showNotification = useNotification()
  const navigate = useNavigate()

  return (
    <Form<FormValues>
      schema={schema}
      onSubmit={({ name }) => {
        const slug = slugify(name, { lower: true })

        createBoard.mutate(
          { name, slug, user_id: user.id },
          {
            onSuccess: (newBoard) => {
              showNotification({
                type: 'success',
                message: 'New board created'
              })
              closeModal()
              navigate(newBoard.slug)
            }
          }
        )
      }}
    >
      {({ register, formState }) => (
        <HStack align='start' gap={2}>
          <InputField
            id='name'
            placeholder='e.g: Platform Launch'
            registration={register('name')}
            error={formState.errors.name}
            type='text'
          />
          <Button type='submit' colorScheme='orange' isLoading={createBoard.isLoading} px={7}>
            Create Board
          </Button>
        </HStack>
      )}
    </Form>
  )
}
