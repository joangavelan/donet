import type {
  FieldError,
  FieldValues,
  Control,
  ArrayPath,
  UseFieldArrayReturn
} from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { FormLabel, FormErrorMessage, FormControl } from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/react'

type DynamicInputFieldsProps<TFormValues extends FieldValues> = {
  arrayField: ArrayPath<TFormValues>
  label?: string
  control: Control<TFormValues>
  error: FieldError | undefined
  sx?: SystemStyleObject
  children: (methods: UseFieldArrayReturn<TFormValues>) => React.ReactNode
}

export const DynamicInputFields = <TFormValues extends FieldValues>({
  arrayField,
  label,
  control,
  error,
  sx,
  children
}: DynamicInputFieldsProps<TFormValues>) => {
  const methods = useFieldArray<TFormValues>({
    name: arrayField,
    control
  })

  return (
    <FormControl isInvalid={!!error} sx={sx}>
      {label && <FormLabel>{label}</FormLabel>}
      {children(methods)}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
