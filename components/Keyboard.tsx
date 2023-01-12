import styles from '../styles/Keyboard.module.css';
import { LanguageKeyData } from '../types';

interface KeyboardKeyProps {
  keyData: LanguageKeyData;
  isUppercase: boolean;
  updateText: (insertText: string) => void;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { keyData, isUppercase, updateText } = props;
  const { from, to, FROM, TO } = keyData;

  if (!to) return <div className={`${styles.keyboardKey}`}></div>;

  const getCase = (lower: string, upper: string) =>
    (isUppercase ? upper : lower) || lower;

  const displayTo = getCase(to, TO);
  const displayFrom = getCase(from, FROM);

  return (
    <button
      className={`${styles.keyboardKey}`}
      onClick={() => updateText(displayTo)}
    >
      <span className={styles.keyboardKeyTo}>{displayTo}</span>
      <span className={styles.keyboardKeyFrom}>{displayFrom}</span>
    </button>
  );
};

interface KeyboardProps {
  layout: LanguageKeyData[][][];
  isUppercase: boolean;
  updateText: (insertText: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  const { layout, isUppercase, updateText } = props;
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
                  isUppercase={isUppercase}
                  updateText={updateText}
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
