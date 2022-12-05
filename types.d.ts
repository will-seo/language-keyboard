export type LanguageCharacterData = {
  to: string;
  x: number;
  y: number;
};

export type LanguageData = {
  name: string;
  flag: string;
  rows: number;
  columns: number;
  characters: {
    [key: string]: LanguageCharacterData;
  };
};
