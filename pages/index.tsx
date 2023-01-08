import Link from 'next/link';
import BasePage from '../components/Base';
import { getLanguages, loadLanguage } from '../utils/languages';

const title = 'Language Keyboard';
const description =
  'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.';

interface LinkProps {
  label: string;
  route: string;
}

interface HomePageProps {
  languages: LinkProps[];
}

const HomePage = (props: HomePageProps) => {
  const { languages } = props;
  return (
    <BasePage title={title} description={description}>
      <nav>
        {languages.map((language, key) => (
          <Link href={language.route} key={key}>
            {language.label}
          </Link>
        ))}
      </nav>
    </BasePage>
  );
};

export const getStaticProps = async () => {
  const languages = getLanguages().map((route) => {
    const language = loadLanguage(route);
    const label = language.language;
    return {
      label,
      route,
    };
  });
  return {
    props: {
      languages,
    },
  };
};

export default HomePage;
