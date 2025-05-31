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
      <p>Welcome to the Language Keyboard, your one-stop-shop for typing in non-roman alphabets.</p>
      <p>
        Find below a list of our current keyboards. We're always looking for new languages to add, so{' '}
        <a href="mailto:will@languagekeyboard.net">please send us any requests</a>.
      </p>
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td>
              <Link href="/japanese">Japanese Keyboard</Link>
            </td>
            <td>
              <Link href="/russian">Russian Keyboard</Link>
            </td>
            <td>
              <Link href="/maori">Maori Keyboard</Link>
            </td>
            <td>
              <Link href="/french">French Keyboard</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/spanish">Spanish Keyboard</Link>
            </td>
            <td>
              <Link href="/german">German Keyboard</Link>
            </td>
            <td>
              <Link href="/morse-code">Morse Code</Link>
            </td>
            <td>
              <Link href="/min-to-maj">Min to Maj</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
