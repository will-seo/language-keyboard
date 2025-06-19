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
  title?: string;
  description?: string;
  image?: string;
};

export type LanguageKeyData = {
  from: string;
  to: string;
  FROM?: string;
  TO?: string;
  shift?: boolean;
};

export type LanguageMode = {
  name?: string;
  dictionary: { [key: string]: string };
  layout: LanguageKeyData[][][];
};

export type LanguageData = {
  language?: string;
  h1: string;
  menu?: string;
  placeholder?: string;
  mobileKeyboard?: boolean;
  mobileKeyboardToggle?: boolean;
  rightToLeft?: boolean;
  copy?: boolean;
  spacebarCharacter?: string;
  backspace?: boolean;
  backspaceRemoveWord?: boolean;
  meta?: MetaData;
  faqs?: FAQ[];
  modes: LanguageMode[];
};

export interface LanguageModeProcessed extends LanguageMode {
  key: number;
  capsLock: boolean;
  shift: boolean;
}

export type LetterToWordMap = { [letter: string]: { word: string; translation: string }[] };

export type GlobalContext = {
  baseURL: string;
  menu: MenuLink[];
};
export interface PageProps {
  globalContext: GlobalContext;
}
