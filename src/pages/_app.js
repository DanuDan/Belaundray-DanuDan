import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from '../store/store';
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component style={inter.style} {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </Provider>
  )
}
