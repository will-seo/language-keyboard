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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, harum nisi. Voluptatem culpa vero provident illo.
        Accusamus dicta consequuntur harum quod necessitatibus odit perferendis a quo dolorem. Eius, placeat earum?
        Voluptatum, quia excepturi! Similique, debitis.
      </p>
      <ul>
        <li>
          <a href="https://languagekeyboard.net/japanese">Japanese Keyboard</a>
        </li>
        <li>
          <a href="https://languagekeyboard.net/russian">Russian Keyboard</a>
        </li>
        <li>
          <a href="https://languagekeyboard.net/maori">Maori Keyboard</a>
        </li>
      </ul>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
