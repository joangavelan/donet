import type { SystemStyleObject } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import type { UseFormReturn, SubmitHandler, UseFormProps, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { Schema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type FormProps<TFormValues extends FieldValues> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  onSubmit: SubmitHandler<TFormValues>
  options?: UseFormProps<TFormValues>
  schema: Schema
  sx?: SystemStyleObject
}

export const Form = <TFormValues extends FieldValues>({
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
      {children(methods)}
    </chakra.form>
  )
}
