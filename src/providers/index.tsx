import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { theme } from '@/theme'
import { HelmetProvider } from 'react-helmet-async'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <Router>{children}</Router>
      </HelmetProvider>
    </ChakraProvider>
  )
}
