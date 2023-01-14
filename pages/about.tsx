import Layout from '../components/Layout';
import { MetaData, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = 'About Language Keyboard';
const meta: MetaData = {
  title: 'About Language Keyboard',
  description:
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.',
  image: '/ogimage.png',
};

const AboutPage = (props: PageProps) => {
  const { globalContext } = props;
  return (
    <Layout globalContext={globalContext} h1={h1} meta={meta}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci asperiores minima, reiciendis, repellat vitae
        doloribus fugiat dolor necessitatibus fuga sunt odio blanditiis ut est maiores ex veniam. Fugit, quidem
        blanditiis.
      </p>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default AboutPage;
