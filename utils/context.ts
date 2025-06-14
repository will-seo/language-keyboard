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
  const mobileKeyboardToggle = data.mobileKeyboardToggle || false;
  const rightToLeft = data.rightToLeft || false;
  const copy = data.copy ?? true;
  const spacebarCharacter = data.spacebarCharacter ?? ' ';
  const backspace = data.backspace ?? true;
  const backspaceRemoveWord = data.backspaceRemoveWord ?? false;
  const meta = data.meta || {};
  const faqs = data.faqs || [];

  const modes = data.modes.map((mode, key) => {
    const [capsLock, shift] = hasModifiers(mode.layout);
    return { key, capsLock, shift, ...mode };
  });

  return {
    ...globalContext,
    h1,
    placeholder,
    mobileKeyboard,
    mobileKeyboardToggle,
    rightToLeft,
    copy,
    spacebarCharacter,
    backspace,
    backspaceRemoveWord,
    meta,
    faqs,
    modes,
  };
};
