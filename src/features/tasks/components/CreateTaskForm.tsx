import {
  Form,
  InputField,
  SelectField,
  TextareaField,
  DynamicInputFields
} from '@/components/Form'
import {
  Stack,
  Button,
  Input,
  HStack,
  Icon,
  FormControl
} from '@chakra-ui/react'
import * as z from 'zod'
import type { Templates } from '@/types'
import { toTitleCase } from '@/utils'
import { IoMdClose } from 'react-icons/io'
import { getSubtaskPlaceholder } from '../utils'
import { useCreateTask } from '../hooks'
import { useNotification } from '@/hooks'
import { useUser } from '@/features/auth/hooks'
import { nanoid } from 'nanoid'

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(100, 'Max length is 100 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(200, 'Max length is 200 characters'),
  subtasks: z
    .object({
      id: z.string(),
      name: z
        .string()
        .trim()
        .min(1, 'Required')
        .max(50, 'Max length is 50 characters'),
      isCompleted: z.boolean()
    })
    .array(),
  template_id: z.number()
})

export type FormValues = z.infer<typeof schema>

type CreateTaskFormProps = {
  templates: Array<Templates['Row']>
  closeModal: () => void
}

export const CreateTaskForm = ({
  templates,
  closeModal
}: CreateTaskFormProps) => {
  const createTask = useCreateTask()
  const showNotification = useNotification()
  const user = useUser()

  return (
    <Form<FormValues>
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/naming-convention
      onSubmit={({ title, description, template_id, subtasks }) => {
        createTask.mutate(
          {
            title,
            description,
            template_id,
            subtasks: JSON.stringify(subtasks),
            user_id: user.id
          },
          {
            onSuccess: () => {
              showNotification({ type: 'success', message: 'New task created' })
              closeModal()
            }
          }
        )
      }}
    >
      {({ register, formState, control }) => (
        <Stack gap={4}>
          <InputField
            id='title'
            label='Title'
            placeholder='e.g: Take coffe break'
            registration={register('title')}
            error={formState.errors.title}
            type='text'
          />
          <TextareaField
            id='description'
            label='Description'
            placeholder="e.g: It's always good to take a break. This 15 minute break will recharge the batteries a little."
            registration={register('description')}
            error={formState.errors.description}
          />
          <DynamicInputFields
            arrayField='subtasks'
            label='Subtasks'
            control={control}
            error={formState.errors.subtasks?.root}
          >
            {({ fields, append, remove }) => (
              <Stack>
                <Stack maxH='8.5rem' overflow='scroll'>
                  {fields.map((field, index) => (
                    <HStack key={field.id}>
                      <FormControl isInvalid={!!formState.errors.subtasks}>
                        <Input
                          {...register(`subtasks.${index}.name`)}
                          placeholder={getSubtaskPlaceholder(index)}
                        />
                      </FormControl>
                      <Icon
                        as={IoMdClose}
                        color='#A1ADC0'
                        boxSize={7}
                        cursor='pointer'
                        _hover={{ color: 'orange.500' }}
                        onClick={() => remove(index)}
                      />
                    </HStack>
                  ))}
                </Stack>

                <Button
                  colorScheme='orange'
                  variant='outline'
                  onClick={() =>
                    append({ id: nanoid(), name: '', isCompleted: false })
                  }
                >
                  + Add New Subtask
                </Button>
              </Stack>
            )}
          </DynamicInputFields>
          <SelectField
            id='template'
            label='Template'
            registration={register('template_id', { valueAsNumber: true })}
            error={formState.errors.template_id}
            options={templates.map(({ id, name }) => ({
              label: toTitleCase(name),
              value: id
            }))}
          />
          <Button
            colorScheme='orange'
            type='submit'
            isLoading={createTask.isLoading}
          >
            Create Task
          </Button>
        </Stack>
      )}
    </Form>
  )
}
