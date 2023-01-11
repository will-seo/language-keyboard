export type LanguageLayout = {
  from: string;
  to: string;
  FROM: string;
  TO: string;
};

export type LanguageMode = {
  name: string;
  dictionary: { [key: string]: string };
  layout: LanguageLayout[][][];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type LanguageData = {
  language: string;
  description: string;
  faqs: FAQ[];
  modes: LanguageMode[];
};

export type MenuLink = {
  label: string;
  route: string;
};

export interface PageProps {
  menu: MenuLink[];
}

export interface LanguageModeProcessed extends LanguageMode {
  allowed: string[];
  bufferMax: number;
  key: number;
}
