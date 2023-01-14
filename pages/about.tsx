import Layout from '../components/Layout';
import { PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = 'About Language Keyboard';
const meta = {
  description:
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.',
};

const AboutPage = (props: PageProps) => {
  const { globalContext } = props;
  return (
    <Layout globalContext={globalContext} h1={h1} meta={meta}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci asperiores minima, reiciendis, repellat vitae
      doloribus fugiat dolor necessitatibus fuga sunt odio blanditiis ut est maiores ex veniam. Fugit, quidem
      blanditiis.
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default AboutPage;
