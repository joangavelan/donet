import {
  Form,
  InputField,
  SelectField,
  TextareaField,
  DynamicInputFields,
  DynamicInputField
} from '@/components/Form'
import { Stack, Button } from '@chakra-ui/react'
import * as z from 'zod'
import type { Templates } from '@/types'
import { toTitleCase } from '@/utils'
import { getSubtaskPlaceholder } from '../utils'
import { nanoid } from 'nanoid'
import type { DeepPartial, FieldError, SubmitHandler } from 'react-hook-form'
import { useBoard } from '@/features/boards/hooks'
import { useTemplates } from '@/features/templates/hooks'

const schema = z.object({
  title: z.string().trim().min(1, 'Required').max(100, 'Max length is 100 characters'),
  description: z.string().trim().max(200, 'Max length is 200 characters'),
  subtasks: z
    .object({
      id: z.string(),
      name: z.string().trim().min(1, 'Required').max(100, 'Max length is 100 characters'),
      is_completed: z.boolean()
    })
    .array()
    .max(10, 'The maximum subtasks you can add is 10'),
  template_id: z.number()
})

export type FormValues = z.infer<typeof schema>

type TaskFormProps = {
  defaultValues?: DeepPartial<FormValues>
  onSubmit: SubmitHandler<FormValues>
  isLoading?: boolean
  submitButtonText: string
}

type Template = Templates['Row']

export const TaskForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  submitButtonText
}: TaskFormProps) => {
  const board = useBoard()
  const { data: templates } = useTemplates(board.id)

  return (
    <Form<FormValues> schema={schema} onSubmit={onSubmit} options={{ defaultValues }}>
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
            error={formState.errors.subtasks as FieldError}
          >
            {({ fields, append, remove }) => (
              <Stack>
                <Stack gap={1} maxH='9rem' overflow='scroll'>
                  {fields.map((field, index) => (
                    <DynamicInputField
                      key={field.id}
                      id={field.id}
                      registration={register(`subtasks.${index}.name`)}
                      placeholder={getSubtaskPlaceholder(index)}
                      onRemove={() => remove(index)}
                      error={formState.errors.subtasks?.[index]?.name}
                      type='text'
                    />
                  ))}
                </Stack>

                <Button
                  colorScheme='orange'
                  variant='outline'
                  onClick={() => append({ id: nanoid(), name: '', is_completed: false })}
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
            options={(templates as Template[]).map(({ id, name }) => ({
              label: toTitleCase(name),
              value: id
            }))}
          />
          <Button colorScheme='orange' type='submit' isLoading={isLoading}>
            {submitButtonText}
          </Button>
        </Stack>
      )}
    </Form>
  )
}
