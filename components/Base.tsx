import Head from 'next/head';
import styles from '../styles/Base.module.css';
import { LanguageFAQsData } from '../types';

interface BasePage {
  children?: React.ReactNode;
  title: string;
  description: string;
  faqs?: LanguageFAQsData[];
}

const renderFAQPageSchema = (faqs?: LanguageFAQsData[]) => {
  const filtered = (faqs || []).filter((faq) => faq.schema);
  if (!filtered) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filtered.map((faq) => {
      return {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      };
    }),
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

const BasePage = (props: BasePage) => {
  const { children, title, description, faqs } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/japanesekeyboard.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/japanesekeyboard.png" />
        {renderFAQPageSchema(faqs)}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {children}
        <p className={styles.disclaimer}>
          Disclaimer: If you click on a link and make a purchase I may receive a
          small commission.
        </p>
      </main>
    </div>
  );
};

BasePage.whyDidYouRender = true;

export default BasePage;
