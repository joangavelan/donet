import { Form, InputField } from '@/components/Form'
import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import { Button, HStack } from '@chakra-ui/react'
import * as z from 'zod'
import { useAddTemplate } from '../hooks'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(22, 'Max length is 22 characters')
    .regex(/^[a-zA-Z0-9 ]*$/, 'Only letters and numbers')
})

type FormValues = z.infer<typeof schema>

type AddTemplateFormProps = {
  closeModal: () => void
}

export const AddTemplateForm = ({ closeModal }: AddTemplateFormProps) => {
  const board = useBoard()
  const addTemplate = useAddTemplate()
  const showNotification = useNotification()

  return (
    <Form<FormValues>
      schema={schema}
      onSubmit={({ name }) => {
        addTemplate.mutate(
          {
            name,
            board_id: board.id
          },
          {
            onSuccess: () => {
              showNotification({
                type: 'success',
                message: 'New template added'
              })
              closeModal()
            }
          }
        )
      }}
    >
      {({ register, formState }) => (
        <HStack gap={2} align='start'>
          <InputField
            id='name'
            placeholder='e.g: In Progress'
            registration={register('name')}
            error={formState.errors.name}
            type='text'
          />
          <Button
            type='submit'
            colorScheme='orange'
            px={8}
            isLoading={addTemplate.isLoading}
          >
            Add Template
          </Button>
        </HStack>
      )}
    </Form>
  )
}
