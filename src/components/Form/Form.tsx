import { chakra, FormControl, SystemStyleObject } from '@chakra-ui/react'
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues
} from 'react-hook-form'
import { Schema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { hasProperties } from '@/utils'

type FormProps<TFormValues extends FieldValues> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  onSubmit: SubmitHandler<TFormValues>
  options?: UseFormProps<TFormValues>
  schema: Schema
  sx?: SystemStyleObject
}

export const Form = <TFormValues extends Record<string, unknown>>({
  children,
  onSubmit,
  schema,
  options,
  sx
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema)
  })

  return (
    <chakra.form onSubmit={methods.handleSubmit(onSubmit)} sx={sx}>
      <FormControl isInvalid={hasProperties(methods.formState.errors)}>
        {children(methods)}
      </FormControl>
    </chakra.form>
  )
}
