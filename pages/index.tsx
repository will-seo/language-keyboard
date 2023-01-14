import Layout from '../components/Layout';
import { MetaData, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = 'Language Keyboard';
const meta: MetaData = {
  title: 'Language Keyboard',
  description:
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.',
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
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus perspiciatis obcaecati, reiciendis atque,
        earum quis odit sequi impedit, necessitatibus vel explicabo pariatur est ipsum quod unde excepturi voluptate
        nihil debitis!
      </p>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default HomePage;
