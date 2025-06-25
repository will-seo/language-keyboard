import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useTernaryDarkMode } from 'usehooks-ts';
import { ADSENSE_ID, DARK_MODE_SETTINGS } from '../utils/constants';
import { useEffect } from 'react';

config.autoAddCss = false;

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useTernaryDarkMode(DARK_MODE_SETTINGS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    try {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } catch (err) {}
  }, []);

  return (
    <>
      <div className={montserrat.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
