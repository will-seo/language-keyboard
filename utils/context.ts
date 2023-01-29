import { MenuLink } from '../types';
import { getLanguages, loadLanguage } from './languages';
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
