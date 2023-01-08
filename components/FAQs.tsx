import styles from '../styles/Keyboard.module.css';
import { LanguageFAQsData } from '../types';

interface FAQsProps {
  faqs: LanguageFAQsData[];
}

const FAQs = (props: FAQsProps) => {
  const { faqs } = props;
  return (
    <section className={styles.faqs}>
      {faqs.map((faq, key) => (
        <div key={key}>
          <h2>{faq.question}</h2>
          <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
        </div>
      ))}
    </section>
  );
};

export default FAQs;
