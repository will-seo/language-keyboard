import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import styles from '../styles/Menu.module.css';
import { MenuLink } from '../types';

interface MenuProps {
  menuOpen: boolean;
  menu: MenuLink[];
  closeMenu: () => void;
}

const Menu = (props: MenuProps) => {
  const { menuOpen, menu, closeMenu } = props;
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <Fragment>
      <div
        className={styles.fadeOut}
        data-open={menuOpen}
        onClick={() => closeMenu()}
      ></div>
      <nav className={styles.menu} data-open={menuOpen}>
        <ul>
          {(menu || []).map((item, key) => (
            <li key={key} data-active={currentPath === item.route}>
              <Link href={item.route}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => closeMenu()}
          className={styles.closeButton}
          aria-label="Close menu"
        ></button>
      </nav>
    </Fragment>
  );
};

export default Menu;
