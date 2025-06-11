import styles from '../styles/FAQ.module.css';
import { FAQ } from '../types';

interface FAQProps {
  faqs?: FAQ[];
}

const FAQComponent = ({ faqs = [] }: FAQProps) => {
  return (
    <section className={styles.faqs}>
      {faqs.map((faq, key) => (
        <div key={key} className={styles.faq}>
          <h2>{faq.question}</h2>
          <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
        </div>
      ))}
    </section>
  );
};

export default FAQComponent;
