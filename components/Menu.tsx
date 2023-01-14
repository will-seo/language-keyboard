import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import buttonStyles from '../styles/Button.module.css';
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
    <>
      <div className={styles.fadeOut} data-open={menuOpen} onClick={() => closeMenu()}></div>
      <nav className={styles.menu} data-open={menuOpen}>
        <ul>
          {(menu || []).map((item, key) => (
            <li key={key} data-active={currentPath === item.route}>
              <Link href={item.route} onClick={() => closeMenu()}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={() => closeMenu()} className={buttonStyles.menuButton} aria-label="Close menu">
          <FontAwesomeIcon icon={faXmark} size="3x" />
        </button>
      </nav>
    </>
  );
};

export default Menu;
