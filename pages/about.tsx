import Layout from '../components/Layout';
import { MetaData, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';

const h1 = 'About';
const meta: MetaData = {
  title: 'About | Languagekeyboard.net',
  description: 'Discover more about the the language keyboard, the phiolsophy behind it, and its future.',
  image: '/ogimage.png',
};

const AboutPage = (props: PageProps) => {
  const { globalContext } = props;
  return (
    <Layout globalContext={globalContext} h1={h1} meta={meta}>
      <p>
        I have been studying Japanese for over three years and during that time I&apos;ve used a number of online
        language tools - some more helpful than others. I original built a Japanese keyboard so that I had a quick and
        simple solution to type in it when I didn&apos;t have a Japanese keyboard installed. Following the success of
        it, I have expanded the tool to cover a range of languages. I hope you find these keyboards as useful as I do.
      </p>
      <p>
        If you have any questions or suggestions, please <a href="mailto:will@languagekeyboard.net">email me</a>, or
        find me on Twitter at{' '}
        <a rel="noopener noreferrer" target="_blank" href="https://mobile.twitter.com/willdropphoto">
          @willdropphoto
        </a>
        .
      </p>
    </Layout>
  );
};

export const getStaticProps = async () => ({ props: getGlobalContext() });

export default AboutPage;
