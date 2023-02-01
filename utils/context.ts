import { KeyboardPageProps } from '../pages/[keyboard]';
import { MenuLink } from '../types';
import { getLanguages, hasModifiers, loadLanguage } from './languages';
import menu from './menu';

export const getMenuLanguages = () => {
  return getLanguages().map((filename) => {
    const route = `/${filename}`;
    const language = loadLanguage(route);
    const label = language.menu || language.h1;
    return <MenuLink>{ label, route };
  });
};

export const getGlobalContext = () => {
  return {
    globalContext: {
      baseURL: process.env.URL || '',
      gtagID: process.env.NEXT_PUBLIC_GTAG_ID || '',
      menu: [...menu, ...getMenuLanguages()],
    },
  };
};

export const getLanguageContext = (keyboard: string): KeyboardPageProps => {
  const globalContext = getGlobalContext();

  const data = loadLanguage(keyboard);
  const { h1 } = data;
  const placeholder = data.placeholder || '';
  const mobileKeyboard = data.mobileKeyboard ?? true;
  const copy = data.copy ?? true;
  const spacebar = data.spacebar ?? true;
  const backspace = data.backspace ?? true;
  const meta = data.meta || {};
  const faqs = data.faqs || [];

  const modes = data.modes.map((mode, key) => {
    const words = Object.keys(mode.dictionary);
    const allowed = Array.from(new Set(words.join(''))).sort();
    const bufferMax = Math.max(...words.map((word) => word.length), 0);
    const [capsLock, shift] = hasModifiers(mode.layout);
    return { key, allowed, bufferMax, capsLock, shift, ...mode };
  });

  return { ...globalContext, h1, placeholder, mobileKeyboard, copy, spacebar, backspace, meta, faqs, modes };
};
