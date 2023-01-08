import BasePage from '../components/Base';

const HomePage = () => {
  const title = 'Language Keyboard';
  const metaDescription =
    'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.';
  return <BasePage title={title} metaDescription={metaDescription}></BasePage>;
};

HomePage.whyDidYouRender = true;

export default HomePage;
