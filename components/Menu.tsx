import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import buttonStyles from '../styles/Button.module.css';
import styles from '../styles/Menu.module.css';
import { MenuLink } from '../types';

const menuText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ullam fugit at, nobis sequi distinctio quia architecto ad, laboriosam adipisci nam quasi blanditiis consequuntur provident enim? Odit quaerat at iusto.';

interface MenuProps {
  menuOpen: boolean;
  menu: MenuLink[];
  closeMenu: () => void;
}

const Menu = (props: MenuProps) => {
  const { menuOpen, menu, closeMenu } = props;
  const currentPath = usePathname();

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [menuOpen]);

  return (
    <>
      <div className={styles.fadeOut} data-open={menuOpen} onClick={() => closeMenu()}></div>
      <nav className={styles.menu} data-open={menuOpen}>
        <ul className={styles.scrollbar}>
          {(menu || []).map((item, key) => (
            <li key={key} data-active={currentPath === item.route}>
              <Link href={item.route} onClick={() => closeMenu()}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={() => closeMenu()} className={buttonStyles.menuButton} aria-label="Close menu">
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </button>
        {menuText && <div className={styles.menuText}>{menuText}</div>}
      </nav>
    </>
  );
};

export default Menu;
