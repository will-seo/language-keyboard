import fs from 'fs';
import path from 'path';
import { LanguageData } from '../types';

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
