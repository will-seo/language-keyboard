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

export const hasModifiers = (layout: LanguageKeyData[][][]): [capsLock: boolean, shift: boolean] => {
  const upperKeys = layout.flat(2).filter((keyData) => keyData.to && keyData.TO);
  const shiftKeys = upperKeys.filter((keyData) => keyData.shift);
  const shift = shiftKeys.length > 0;
  const capsLock = upperKeys.length - shiftKeys.length > 0;
  return [capsLock, shift];
};
