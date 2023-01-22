import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import buttonStyles from '../styles/Button.module.css';
import styles from '../styles/Header.module.css';
import { MenuLink } from '../types';
import Menu from './Menu';

interface HeaderProps {
  h1: string;
  menu: MenuLink[];
}

const Header = (props: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { h1, menu } = props;
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Image src="/language-keyboard-logo.svg" alt="Language keyboard logo" width={48} height={48} />
        <h1 className={styles.title}>{h1}</h1>
        <Menu menuOpen={menuOpen} menu={menu} closeMenu={() => setMenuOpen(false)} />
        <button onClick={() => setMenuOpen(true)} className={buttonStyles.menuButton} aria-label="Open menu">
          <FontAwesomeIcon icon={faBars} size="3x" />
        </button>
      </div>
    </header>
  );
};

export default Header;
