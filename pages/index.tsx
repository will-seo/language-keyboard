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
      <p>Here're all our keyboards so far</p>
      <table>
        <tr>
          <td>
            <a href="https://languagekeyboard.net/japanese">Japanese Keyboard</a>
          </td>
          <td>
            <a href="https://languagekeyboard.net/russian">Russian Keyboard</a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://languagekeyboard.net/maori">Maori Keyboard</a>
          </td>
          <td>
            <a href="https://languagekeyboard.net/spanish">Spanish Keyboard</a>
          </td>
        </tr>
      </table>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
