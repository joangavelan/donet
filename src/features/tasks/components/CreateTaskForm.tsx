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
import type { Template } from '@/types'
import { toTitleCase } from '@/utils'
import { IoMdClose } from 'react-icons/io'
import { getSubtaskPlaceholder } from '../utils'

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(25, 'Max length is 25 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(300, 'Max length is 300 characters'),
  subtasks: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, 'Required')
        .max(50, 'Max length is 50 characters'),
      completed: z.boolean()
    })
    .array(),
  template: z.string()
})

type FormValues = z.infer<typeof schema>

type CreateTaskFormProps = {
  templates: Template[]
  closeModal: () => void
}

export const CreateTaskForm = ({
  templates,
  closeModal
}: CreateTaskFormProps) => {
  return (
    <Form<FormValues>
      schema={schema}
      onSubmit={(values) => {
        console.log(values)
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

                <Button
                  colorScheme='orange'
                  variant='outline'
                  onClick={() => append({ name: '', completed: false })}
                >
                  + Add New Subtask
                </Button>
              </Stack>
            )}
          </DynamicInputFields>
          <SelectField
            id='template'
            label='Template'
            registration={register('template')}
            error={formState.errors.template}
            options={templates.map(({ id, name }) => ({
              label: toTitleCase(name),
              value: id
            }))}
          />
          <Button colorScheme='orange' type='submit'>
            Create Task
          </Button>
        </Stack>
      )}
    </Form>
  )
}
