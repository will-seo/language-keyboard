import { MouseEvent } from 'react';
import styles from '../styles/Keyboard.module.css';
import { LanguageLayoutData } from '../types';

interface KeyboardKeyProps {
  to: string;
  from: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { from, to, onClick } = props;
  return (
    <button onClick={onClick}>
      <span className={styles.to}>{to}</span>
      <span className={styles.from}>{from}</span>
    </button>
  );
};

KeyboardKey.whyDidYouRender = true;

interface KeyboardProps {
  layout: LanguageLayoutData[];
  rows: number;
  columns: number;
  onClick: (insertText: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  const { layout, rows, columns, onClick } = props;
  const keyboardKeys: (LanguageLayoutData | null)[][] = [];
  for (let y = 0; y < rows; y++) {
    keyboardKeys[y] = [];
    for (let x = 0; x < columns; x++) {
      const character = layout.find((item) => item.x === x && item.y === y);
      keyboardKeys[y][x] = character || null;
    }
  }
  return (
    <table className={styles.keyboard}>
      <tbody>
        {keyboardKeys.map((tr, y) => (
          <tr key={y}>
            {tr.map((td, x) => (
              <td key={x}>
                {td ? (
                  <KeyboardKey
                    to={td.to}
                    from={td.from}
                    onClick={() => onClick(td.to)}
                  />
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Keyboard.whyDidYouRender = true;

export default Keyboard;
