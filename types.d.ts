export type MenuLink = {
  label: string;
  route: string;
};

export type FAQ = {
  question: string;
  answer: string;
  schema?: boolean;
};

export type MetaData = {
  description?: string;
  image?: string;
};

export type LanguageKeyData = {
  from: string;
  to: string;
  FROM: string;
  TO: string;
};

export type LanguageMode = {
  name: string;
  capslock: boolean;
  dictionary: { [key: string]: string };
  layout: LanguageKey[][][];
};

export type LanguageData = {
  language: string;
  meta?: MetaData;
  faqs?: FAQ[];
  modes: LanguageMode[];
};

export interface LanguageModeProcessed extends LanguageMode {
  allowed: string[];
  bufferMax: number;
  key: number;
}

export interface PageProps {
  menu: MenuLink[];
}
