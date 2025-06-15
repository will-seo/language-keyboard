import styles from '../styles/Keyboard.module.css';
import { LanguageKeyData } from '../types';

interface KeyboardKeyProps {
  keyData: LanguageKeyData;
  capsLock: boolean;
  shift: boolean;
  lastInput: string;
  handleKeyboardKeyClick: (insertText: string, offset?: number) => void;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { keyData, capsLock, shift, lastInput, handleKeyboardKeyClick } = props;
  const { from, to, FROM, TO } = keyData;

  // Return placeholder if "to" isn't set
  if (!to) return <div className={`${styles.keyboardKeyPlaceholder}`}></div>;

  const getCase = (lower: string, upper?: string) => (shift || (capsLock && !keyData.shift) ? upper : lower) || lower;
  const displayTo = getCase(to, TO);
  const displayFrom = getCase(from, FROM);

  return (
    <div
      className={`${styles.keyboardKey}`}
      data-active={displayTo === lastInput}
      onClick={() => handleKeyboardKeyClick(displayTo)}
    >
      <span className={styles.keyboardKeyTo}>{displayTo}</span>
      <span className={styles.keyboardKeyFrom}>{displayFrom}</span>
    </div>
  );
};

interface KeyboardProps {
  layout: LanguageKeyData[][][];
  capsLock: boolean;
  shift: boolean;
  lastInput: string;
  handleKeyboardKeyClick: (insertText: string, offset?: number) => void;
}

const Keyboard = (props: KeyboardProps) => {
  const { layout, capsLock, shift, lastInput, handleKeyboardKeyClick } = props;
  return (
    <div className={styles.keyboard}>
      {layout.map((columns, i) => (
        <div key={i} className={styles.keyboardColumn}>
          {columns.map((rows, j) => (
            <div key={j} className={styles.keyboardRow}>
              {rows.map((keyData, k) => (
                <KeyboardKey
                  key={k}
                  keyData={keyData}
                  capsLock={capsLock}
                  shift={shift}
                  handleKeyboardKeyClick={handleKeyboardKeyClick}
                  lastInput={lastInput}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
