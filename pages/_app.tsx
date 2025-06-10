import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Montserrat } from "next/font/google";
import type { AppProps } from 'next/app';
import '../styles/globals.css';

config.autoAddCss = false;

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Component {...pageProps} />
    </div>
  );
}
