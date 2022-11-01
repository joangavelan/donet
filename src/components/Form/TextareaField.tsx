import type { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import type { SystemStyleObject } from '@chakra-ui/react'
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Textarea
} from '@chakra-ui/react'

type TextareaFieldProps = {
  id: string
  label?: string
  registration: UseFormRegisterReturn
  error: FieldError | undefined
  placeholder?: string
  sx?: SystemStyleObject
}

export const TextareaField = ({
  id,
  label,
  registration,
  error,
  placeholder,
  sx
}: TextareaFieldProps) => {
  return (
    <FormControl isInvalid={!!error} sx={sx}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Textarea id={id} placeholder={placeholder} {...registration} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
