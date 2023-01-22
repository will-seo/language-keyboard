import Link from 'next/link';
import Layout from '../components/Layout';
import { MetaData, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = '404 - Page Not Found';
const meta: MetaData = {
  title: '404 - Page Not Found | Languagekeyboard.net',
  description: '',
};

const FourOhFourPage = (props: PageProps) => {
  const { globalContext } = props;
  return (
    <Layout globalContext={globalContext} h1={h1} meta={meta}>
      <Link href="/">Go back home</Link>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default FourOhFourPage;
