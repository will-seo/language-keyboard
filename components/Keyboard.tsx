import { MouseEvent } from 'react';
import styles from '../styles/Keyboard.module.css';
import { LanguageLayout } from '../types';

interface KeyboardKeyProps {
  layout: LanguageLayout;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { layout, onClick } = props;
  const { from, to, FROM, TO } = layout;

  if (!to)
    return (
      <div className={`${styles.keyboardKey} ${styles.placeholder}`}></div>
    );

  return (
    <button
      className={`${styles.keyboardKey} ${styles.button}`}
      onClick={onClick}
    >
      <span className={styles.keyboardKeyTo}>{to}</span>
      <span className={styles.keyboardKeyFrom}>{from || ''}</span>
    </button>
  );
};

interface KeyboardProps {
  layout: LanguageLayout[][][];
  updateText: (insertText: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  const { layout, updateText } = props;
  return (
    <div className={styles.keyboard}>
      {layout.map((x, i) => (
        <div key={i} className={styles.keyboardColumn}>
          {x.map((y, j) => (
            <div key={j} className={styles.keyboardRow}>
              {y.map((z, k) => (
                <KeyboardKey
                  key={k}
                  layout={z}
                  onClick={() => (z.to ? updateText(z.to) : null)}
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
