import BasePage from '../components/Base';

const title = 'About';
const description =
  'Easily type in Hiragana and Katakana with our online Japanese keyboard - perfect for typing in both ひらがな and カタカナ.';

const AboutPage = () => {
  return <BasePage title={title} description={description}></BasePage>;
};

AboutPage.whyDidYouRender = true;

export default AboutPage;
