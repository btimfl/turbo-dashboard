import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import TurboLayout from '../layouts/TurboLayout'
import { modalTheme } from '../components/theme/flyoutModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "nprogress/nprogress.css";
import AuthProvider from '../components/AuthProvider/AuthProvider'
import AuthGuard from '../components/AuthGuard/AuthGuard'
import { NextPage } from 'next'

const theme = extendTheme({
  components: {
    Modal: modalTheme
  }
});

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          {Component.requireAuth ?
            (
              <AuthGuard>
                <TurboLayout>
                  <Component {...pageProps} />
                </TurboLayout>
              </AuthGuard>
            ) :
            <Component {...pageProps} />
          }
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
