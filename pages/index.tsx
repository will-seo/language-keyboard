import Link from 'next/link';
import Layout from '../components/Layout';
import { MetaData, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = 'Language Keyboard';
const meta: MetaData = {
  title: 'Language Keyboard',
  description: 'Easily type in a range of languages, including Japanese, Russian and Maori.',
  image: '/ogimage.png',
};

const HomePage = (props: PageProps) => {
  const { globalContext } = props;
  return (
    <Layout globalContext={globalContext} h1={h1} meta={meta}>
      <p>Here&apos;re all our keyboards so far</p>
      <table>
        <tbody>
          <tr>
            <td>
              <Link href="/japanese">Japanese Keyboard</Link>
            </td>
            <td>
              <Link href="/russian">Russian Keyboard</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/maori">Maori Keyboard</Link>
            </td>
            <td>
              <Link href="/spanish">Spanish Keyboard</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
