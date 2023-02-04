import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import styles from '../styles/Layout.module.css';
import { FAQ, MetaData, PageProps } from '../types';
import { renderFAQSchema } from '../utils/schema';
import Footer from './Footer';
import Header from './Header';

const metaDefaults: MetaData = {
  title: '',
  description: '',
  image: '/ogimage.png',
};

interface LayoutProps extends PageProps {
  h1: string;
  meta?: MetaData;
  faqs?: FAQ[];
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { globalContext, h1, meta, faqs, children } = props;
  const { baseURL, menu } = globalContext;
  const canonicalUrl = baseURL + usePathname();
  const description = meta?.description || metaDefaults.description;
  const image = baseURL + (meta?.image || metaDefaults.image);
  const title = meta?.title || h1 || metaDefaults.title;
  const viewport = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes';

  const handleAcceptCookies = () => {
    if ('gtag' in window)
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
  };

  useEffect(() => {
    const cookieConsent = getCookieConsentValue();
    if (cookieConsent === 'true') handleAcceptCookies();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        <title>{title}</title>
        <meta name="viewport" content={viewport} />
        <meta name="description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="theme-color" content="#074038" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#0c6457" media="(prefers-color-scheme: light)" />
        {renderFAQSchema(faqs)}
      </Head>
      <Header h1={h1} menu={menu} />
      <main className={styles.main}>{children}</main>
      <Footer />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
              });
            `,
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5WC42T9');
            `,
        }}
      />
      <CookieConsent
        buttonText="Accept all"
        declineButtonText="Decline all"
        style={{ background: 'var(--light-gray)', color: 'var(--dark)' }}
        buttonStyle={{ background: 'var(--dark-teal)', color: 'var(--light)' }}
        declineButtonStyle={{ background: 'var(--red)', color: 'var(--light)' }}
        onAccept={handleAcceptCookies}
        enableDeclineButton
      >
        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
        By clicking &quot;accept all&quot; you consent to our use of cookies.
      </CookieConsent>
    </div>
  );
};

export default Layout;
