import Head from 'next/head';
import { usePathname } from 'next/navigation';
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
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
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
    </>
  );
};

export default Layout;
