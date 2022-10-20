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

const semanticTokens = {
  colors: {
    redirectLinkColor: {
      default: 'orange.500',
      _dark: 'orange.200'
    }
  }
}

export const theme = extendTheme({ config, styles, semanticTokens })
