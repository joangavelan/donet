import type {
  FieldError,
  FieldValues,
  Control,
  ArrayPath,
  UseFieldArrayProps,
  UseFieldArrayReturn
} from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { FormLabel, FormErrorMessage, FormControl } from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/react'

type DynamicInputFieldsProps<TFormValues extends FieldValues> = {
  arrayField: ArrayPath<TFormValues>
  label?: string
  rules?: UseFieldArrayProps['rules']
  control: Control<TFormValues>
  error: FieldError | undefined
  sx?: SystemStyleObject
  children: (methods: UseFieldArrayReturn<TFormValues>) => React.ReactNode
}

export const DynamicInputFields = <TFormValues extends FieldValues>({
  arrayField,
  label,
  rules,
  control,
  error,
  sx,
  children
}: DynamicInputFieldsProps<TFormValues>) => {
  const methods = useFieldArray<TFormValues>({
    name: arrayField,
    control,
    // Rules applied will only work through built-in validation, resolvers are yet to support useFieldArray root level validation. (see rules props at https://react-hook-form.com/api/usefieldarray)
    rules
  })

  return (
    <FormControl isInvalid={!!error} sx={sx}>
      {label && <FormLabel>{label}</FormLabel>}
      {children(methods)}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
