import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import { FAQ, MenuLink, MetaData } from '../types';
import { renderFAQSchema } from '../utils/schema';
import Footer from './Footer';
import Header from './Header';

const metaDefaults: MetaData = {
  description: '',
  image: '/ogimage.png',
};

interface LayoutProps {
  title: string;
  menu: MenuLink[];
  meta?: MetaData;
  faqs?: FAQ[];
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { title, meta, menu, faqs, children } = props;
  const description = meta?.description || metaDefaults.description;
  const image = meta?.image || metaDefaults.image;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {renderFAQSchema(faqs)}
      </Head>
      <Header menu={menu} />
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
