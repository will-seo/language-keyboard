import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import buttonStyles from '../styles/Button.module.css';
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
        <button onClick={() => setMenuOpen(true)} className={buttonStyles.menuButton} aria-label="Open menu">
          <FontAwesomeIcon icon={faBars} size="3x" />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <Menu menuOpen={menuOpen} menu={menu} closeMenu={() => setMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
