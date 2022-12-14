import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Navigation from '../components/Navigation/Navigation'
import Head from 'next/head'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isMenuOpen, setMenuOpen] = useState(true);
  
  return (
    <ChakraProvider>
      <HeaderBar/>
      <Navigation open={isMenuOpen} setMenuOpen={setMenuOpen}/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
