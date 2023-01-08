export type LanguageLayoutData = {
  from: string;
  to: string;
  x: number;
  y: number;
};

export type LanguageFAQsData = {
  question: string;
  answer: string;
  schema: boolean;
};

export type LanguageModeData = {
  name: string;
  dictionary: { [key: string]: string };
  layout: LanguageLayoutData[];
};

export type LanguageData = {
  language: string;
  description: string;
  faqs: LanguageFAQsData[];
  modes: LanguageModeData[];
};
