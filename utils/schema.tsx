import { FAQ } from '../types';

export const renderSchema = (data: object) => (
  <script type="application/ld+json">{JSON.stringify(data)}</script>
);

export const renderFAQSchema = (faqs?: FAQ[]) =>
  faqs
    ? renderSchema({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => {
          return {
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          };
        }),
      })
    : null;
