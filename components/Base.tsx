import Head from 'next/head';
import styles from '../styles/Base.module.css';

interface BasePage {
  children?: React.ReactNode;
  title: string;
  metaDescription?: string;
}

const BasePage = (props: BasePage) => {
  const { children, title, metaDescription } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
    </div>
  );
};

BasePage.whyDidYouRender = true;

export default BasePage;
