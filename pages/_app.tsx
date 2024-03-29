import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import TurboLayout from "../layouts/TurboLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import "nprogress/nprogress.css";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import { NextPage } from "next";
import { dividerTheme, modalTheme } from "../themes";
import DynamicHead from "../components/DynamicHead/DynamicHead";

const theme = extendTheme({
  components: {
    Modal: modalTheme,
    Divider: dividerTheme,
  },
});

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <>
            <DynamicHead title={Component.title} />
            {Component.requireAuth ? (
              <AuthGuard>
                <TurboLayout>
                  <Component {...pageProps} />
                </TurboLayout>
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
