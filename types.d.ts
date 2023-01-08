export type LanguageLayoutData = {
  from: string;
  to: string;
  x: number;
  y: number;
};

export type LanguageFAQsData = {
  question: string;
  answer: string;
};

export type LanguageData = {
  language: string;
  faqs: LanguageFAQsData[];
  dictionary: {
    [key: string]: string;
  };
  layout: LanguageLayoutData[];
};
