import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Navigation from '../components/Navigation/Navigation'
import Head from 'next/head'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { useState } from 'react'
import TurboLayout from '../layouts/TurboLayout'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider>
      <TurboLayout>
        <Component {...pageProps} />
      </TurboLayout>
      
    </ChakraProvider>
  )
}
