import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navigation from '../components/Navigation/Navigation'
import Head from 'next/head'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { useState } from 'react'
import TurboLayout from '../layouts/TurboLayout'
import { modalTheme } from '../components/theme/flyoutModal'

const theme = extendTheme({
  components: {
    Modal: modalTheme
  }
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider theme = {theme}>
      <TurboLayout>
        <Component {...pageProps} />
      </TurboLayout>
      
    </ChakraProvider>
  )
}
