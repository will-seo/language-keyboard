import Layout from '../components/Layout';
import { PageProps } from '../types';
import { getMenu } from '../utils/menu';

const title = 'About Language Keyboard';
const meta = {
  description:
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.',
};

const AboutPage = (props: PageProps) => {
  const { menu } = props;
  return (
    <Layout title={title} meta={meta} menu={menu}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
      asperiores minima, reiciendis, repellat vitae doloribus fugiat dolor
      necessitatibus fuga sunt odio blanditiis ut est maiores ex veniam. Fugit,
      quidem blanditiis.
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: { menu: getMenu() } });

export default AboutPage;
