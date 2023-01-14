import { MenuLink } from '../types';
import { getLanguages, loadLanguage } from './languages';

export const getMenu = () => {
  const defaults: MenuLink[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
  ];

  const languages = getLanguages().map((filename) => {
    const route = `/${filename}`;
    const language = loadLanguage(route);
    const label = language.h1;
    return <MenuLink>{ label, route };
  });

  return [...defaults, ...languages];
};

export const getGlobalContext = () => {
  return {
    globalContext: {
      menu: getMenu(),
      baseURL: process.env.URL || '',
    },
  };
};
