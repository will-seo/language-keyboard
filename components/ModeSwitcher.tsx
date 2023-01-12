import styles from '../styles/Toggle.module.css';
import { LanguageModeProcessed } from '../types';

interface ModeSwitcherProps {
  currentMode: LanguageModeProcessed;
  allModes: LanguageModeProcessed[];
  handleChange: (key: number) => void;
}

const ModeSwitcher = (props: ModeSwitcherProps) => {
  const { currentMode, allModes, handleChange } = props;
  return allModes.length > 1 ? (
    <nav className={styles.toggle}>
      {allModes.map((mode, key) => (
        <button
          key={key}
          data-active={mode.key === currentMode.key}
          onClick={() => handleChange(mode.key)}
        >
          {mode.name || ''}
        </button>
      ))}
    </nav>
  ) : null;
};

export default ModeSwitcher;
