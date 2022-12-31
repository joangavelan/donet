import { GridItem } from '@chakra-ui/react'

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <GridItem as='main' area='main' overflow='scroll'>
      {children}
    </GridItem>
  )
}
