import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import buttonStyles from '../styles/Button.module.css';
import styles from '../styles/Header.module.css';
import { MenuLink } from '../types';
import Menu from './Menu';

const logoSize = 32;

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
        <Link href="/" className={styles.homeLink}>
          <Image src="/language-keyboard-logo.svg" alt="Language keyboard logo" width={logoSize} height={logoSize} />
        </Link>
        <h1 className={styles.title}>{h1}</h1>
        <Menu menuOpen={menuOpen} menu={menu} closeMenu={() => setMenuOpen(false)} />
        <button onClick={() => setMenuOpen(true)} className={buttonStyles.menuButton} aria-label="Open menu">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </div>
    </header>
  );
};

export default Header;
