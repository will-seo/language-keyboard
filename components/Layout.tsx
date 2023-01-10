import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import { FAQ, MenuLink } from '../types';
import { renderFAQSchema } from '../utils/schema';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  title: string;
  description: string;
  menu: MenuLink[];
  faqs?: FAQ[];
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { title, description, menu, faqs, children } = props;
  const ogimage = '/ogimage.png';
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogimage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogimage} />
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
