import type { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import type { SystemStyleObject } from '@chakra-ui/react'
import { FormLabel, HStack, Icon, Stack, Input, FormErrorMessage } from '@chakra-ui/react'
import type { HTMLInputTypeAttribute } from 'react'
import { IoMdClose } from 'react-icons/io'

type DynamicInputFieldProps = {
  id: string
  label?: string
  registration: UseFormRegisterReturn
  error: FieldError | undefined
  type: HTMLInputTypeAttribute
  placeholder?: string
  onRemove: () => void
  sx?: SystemStyleObject
}

export const DynamicInputField = ({
  id,
  label,
  type,
  registration,
  error,
  placeholder,
  onRemove,
  sx
}: DynamicInputFieldProps) => {
  return (
    <Stack sx={sx}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <HStack>
        <Input id={id} {...registration} placeholder={placeholder} type={type} />
        <Icon
          as={IoMdClose}
          color='#A1ADC0'
          boxSize={7}
          cursor='pointer'
          _hover={{ color: 'orange.500' }}
          onClick={onRemove}
        />
      </HStack>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </Stack>
  )
}
