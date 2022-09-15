import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

const styles = {
  global: {
    ul: {
      listStyle: 'none'
    }
  }
}

export const theme = extendTheme({ config, styles })
