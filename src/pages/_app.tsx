import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "@/components/alerts/alert-provider";
import { AuthProvider } from "@/providers/auth-provider/auth-provider";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthProvider>
          <AlertProvider>
            <Component {...pageProps} />
          </AlertProvider>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
