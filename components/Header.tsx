import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';
import { MenuLink } from '../types';

interface HeaderProps {
  menu: MenuLink[];
}

const Header = (props: HeaderProps) => {
  const { menu } = props;
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul>
          {(menu || []).map((item, key) => (
            <li key={key} data-active={currentPath === item.route}>
              <Link href={item.route}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
