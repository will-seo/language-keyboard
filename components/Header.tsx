import {
  brands,
  icon,
  regular,
  solid,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from '../styles/Header.module.css';
import { MenuLink } from '../types';
import Menu from './Menu';

interface HeaderProps {
  title: string;
  menu: MenuLink[];
}

const Header = (props: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, menu } = props;
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <button
          onClick={() => setMenuOpen(true)}
          className={styles.openButton}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={solid('user-secret')} />
          <FontAwesomeIcon icon={regular('coffee')} />
          <FontAwesomeIcon icon={icon({ name: 'coffee', style: 'solid' })} />
          <FontAwesomeIcon icon={brands('twitter')} />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <Menu
          menuOpen={menuOpen}
          menu={menu}
          closeMenu={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
