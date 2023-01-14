import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import { FAQ, MetaData, PageProps } from '../types';
import { renderAnalytics } from '../utils/analytics';
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
  const { baseURL, gtagID, menu } = globalContext;
  const router = useRouter();
  const canonicalUrl = baseURL + router.asPath;
  const description = meta?.description || metaDefaults.description;
  const image = baseURL + (meta?.image || metaDefaults.image);
  const title = meta?.title || h1 || metaDefaults.title;
  const viewport = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes';
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
        {renderFAQSchema(faqs)}
      </Head>
      <Header h1={h1} menu={menu} />
      <main className={styles.main}>{children}</main>
      <Footer />
      {renderAnalytics(gtagID)}
    </div>
  );
};

export default Layout;
