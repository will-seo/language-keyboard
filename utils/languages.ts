import fs from 'fs';
import path from 'path';
import { LanguageData, LanguageKeyData } from '../types';

export const getLanguagesDirectory = () => {
  return path.join(process.cwd(), 'languages');
};

export const getLanguages = () => {
  const filenames = fs.readdirSync(getLanguagesDirectory());
  return filenames.map((filename) => path.parse(filename).name);
};

export const loadLanguage = (language: string): LanguageData => {
  const filePath = path.join(getLanguagesDirectory(), `${language}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
};

export const layoutToKeyLookup = (layout: LanguageKeyData[][][]): { [key: string]: string } => {
  const flattened = layout
    .flat(2)
    .filter((keyData) => keyData.from && keyData.FROM)
    .map((keyData) => {
      return { [keyData.from]: keyData.FROM };
    });
  // console.log(flattened);
  return Object.assign({}, ...flattened);
};
