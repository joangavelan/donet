import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

const styles = {
  global: {
    html: {
      fontSize: {
        base: '90%',
        md: '95%',
        lg: '100%'
      }
    },
    ul: {
      listStyle: 'none'
    },
    '*:focus-visible, *[data-focus], *[aria-invalid=true]': {
      boxShadow: 'none !important',
      borderColor: 'inherit !important'
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
