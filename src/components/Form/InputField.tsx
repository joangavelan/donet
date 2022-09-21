import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import {
  FormLabel,
  Input,
  FormErrorMessage,
  SystemStyleObject,
  FormControl
} from '@chakra-ui/react'
import { HTMLInputTypeAttribute } from 'react'

type InputFieldProps = {
  id: string
  label?: string
  registration: UseFormRegisterReturn
  error: FieldError | undefined
  type: HTMLInputTypeAttribute
  placeholder?: string
  sx?: SystemStyleObject
}

export const InputField = ({
  id,
  label,
  type,
  registration,
  error,
  placeholder,
  sx
}: InputFieldProps) => {
  return (
    <FormControl isInvalid={!!error} sx={sx}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Input id={id} type={type} placeholder={placeholder} {...registration} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
