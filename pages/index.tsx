import AdSlot from '../components/AdSlot';
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
        Find below a list of our current keyboards. We&apos;re always looking for new languages to add, so{' '}
        <a href="mailto:will@languagekeyboard.net">please send us any requests</a>.
      </p>
      <ul>
        <li>
          <a href="/japanese">Japanese Keyboard</a>
        </li>
        <li>
          <a href="/russian">Russian Keyboard</a>
        </li>
        <li>
          <a href="/maori">Maori Keyboard</a>
        </li>
        <li>
          <a href="/french">French Keyboard</a>
        </li>
        <li>
          <a href="/spanish">Spanish Keyboard</a>
        </li>
        <li>
          <a href="/german">German Keyboard</a>
        </li>
        <li>
          <a href="/morse-code">Morse Code</a>
        </li>
        <li>
          <a href="/min-to-maj">Min to Maj</a>
        </li>
        <li>
          <a href="/arabic">Arabic Keyboard</a>
        </li>
        <li>
          <a href="/hebrew">Hebrew Keyboard</a>
        </li>
      </ul>
      <AdSlot />
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
