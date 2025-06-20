import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useTernaryDarkMode } from 'usehooks-ts';
import { DARK_MODE_SETTINGS } from '../utils/constants';

config.autoAddCss = false;

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useTernaryDarkMode(DARK_MODE_SETTINGS);
  return (
    <>
      <div className={montserrat.className} data-theme={isDarkMode ? 'dark' : 'light'}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
