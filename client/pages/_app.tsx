import type { AppProps } from 'next/app'
import Head from 'next/head';
import { EmployeeProvider } from '../contexts/useEmployees';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Employee Management App</title>
    </Head>
    <EmployeeProvider>
      <Component {...pageProps} />
    </EmployeeProvider>
    </>
  );
}