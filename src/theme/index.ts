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
    },
    '::-webkit-scrollbar': {
      height: '.8rem'
    },
    '::-webkit-scrollbar-track': {
      bg: 'none'
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'scrollThumbBg',
      borderRadius: '1rem'
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'scrollThumbHoverBg'
    },
    '::-webkit-scrollbar-corner': {
      bg: 'none'
    }
  }
}

const semanticTokens = {
  colors: {
    redirectLinkColor: {
      default: 'orange.500',
      _dark: 'orange.200'
    },
    scrollThumbBg: {
      default: 'blackAlpha.300',
      _dark: 'gray.700'
    },
    scrollThumbHoverBg: {
      default: 'blackAlpha.400',
      _dark: 'gray.600'
    }
  }
}

export const theme = extendTheme({ config, styles, semanticTokens })
