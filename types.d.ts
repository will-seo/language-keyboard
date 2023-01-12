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
  FROM?: string;
  TO?: string;
  special?: boolean;
};

export type LanguageMode = {
  name?: string;
  capslock: boolean;
  dictionary: { [key: string]: string };
  layout: LanguageKeyData[][][];
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
  keyLookup: { [key: string]: string };
  key: number;
}

export interface PageProps {
  menu: MenuLink[];
}
