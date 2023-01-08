import BasePage from '../components/Base';

const HomePage = () => {
  const title = 'Language Keyboard';
  const description =
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.';
  return <BasePage title={title} description={description}></BasePage>;
};

HomePage.whyDidYouRender = true;

export default HomePage;
