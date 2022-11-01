import type { SystemStyleObject } from '@chakra-ui/react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select
} from '@chakra-ui/react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export type Option = {
  label?: string
  value: string | number
}

type SelectFieldProps = {
  id: string
  label?: string
  registration: UseFormRegisterReturn
  error: FieldError | undefined
  placeholder?: string
  options: Option[]
  sx?: SystemStyleObject
}

export const SelectField = ({
  id,
  label,
  registration,
  error,
  placeholder,
  options,
  sx
}: SelectFieldProps) => {
  return (
    <FormControl isInvalid={!!error} sx={sx}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Select id={id} placeholder={placeholder} {...registration}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label ?? value}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
