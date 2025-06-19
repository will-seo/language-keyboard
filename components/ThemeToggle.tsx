import styles from '../styles/ThemeToggle.module.css';
import { TernaryDarkMode, useTernaryDarkMode } from 'usehooks-ts';
import { DARK_MODE_SETTINGS } from '../utils/constants';

const ThemeToggle = () => {
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode(DARK_MODE_SETTINGS);
  return (
    <div className={styles.themeToggle}>
      <label htmlFor="theme">Theme</label>
      <select
        name="theme"
        id="theme"
        onChange={(e) => setTernaryDarkMode(e.target.value as TernaryDarkMode)}
        value={ternaryDarkMode}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
