import styles from '../styles/FAQ.module.css';
import { FAQ } from '../types';

interface FAQProps {
  faqs: FAQ[];
}

const FAQ = (props: FAQProps) => {
  const { faqs } = props;
  return (
    <section>
      {faqs.map((faq, key) => (
        <div key={key} className={styles.faq}>
          <h2 className={styles.question}>{faq.question}</h2>
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          ></div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;
