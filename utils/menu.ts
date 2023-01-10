import { MenuLink } from '../types';
import { getLanguages, loadLanguage } from './languages';

export const getMenu = () => {
  const defaults: MenuLink[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
  ];

  const languages = getLanguages().map((filename) => {
    const route = `/${filename}`;
    const language = loadLanguage(route).language;
    const label = `${language} Keyboard`;
    const link: MenuLink = { label, route };
    return link;
  });

  return [...defaults, ...languages];
};
