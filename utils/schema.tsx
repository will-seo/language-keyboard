import { FAQ } from '../types';

export const renderSchema = (data: object) => <script type="application/ld+json">{JSON.stringify(data)}</script>;

export const renderFAQSchema = (faqs?: FAQ[]) => {
  const filtered = faqs?.filter((faq) => faq.schema !== false);
  return (
    filtered &&
    renderSchema({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: filtered.map((faq) => {
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
  );
};
