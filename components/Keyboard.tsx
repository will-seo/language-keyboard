import styles from '../styles/Keyboard.module.css';
import { LanguageLayout } from '../types';

interface KeyboardKeyProps {
  layout: LanguageLayout;
  isUppercase: boolean;
  updateText: (insertText: string) => void;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { layout, isUppercase, updateText } = props;
  const { from, to, FROM, TO } = layout;

  if (!to)
    return (
      <div className={`${styles.keyboardKey} ${styles.placeholder}`}></div>
    );

  const getCase = (lower: string, upper: string) =>
    (isUppercase ? upper : lower) || lower;

  const displayTo = getCase(to, TO);
  const displayFrom = getCase(from, FROM);

  return (
    <button
      className={`${styles.keyboardKey} ${styles.button}`}
      onClick={() => updateText(displayTo)}
    >
      <span className={styles.keyboardKeyTo}>{displayTo}</span>
      <span className={styles.keyboardKeyFrom}>{displayFrom}</span>
    </button>
  );
};

interface KeyboardProps {
  layout: LanguageLayout[][][];
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
              {rows.map((keyLayout, k) => (
                <KeyboardKey
                  key={k}
                  layout={keyLayout}
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
