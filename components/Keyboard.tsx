import { LanguageData } from '../types';
import { MouseEvent } from 'react';
import styles from '../styles/Home.module.css'

interface KeyboardProps {
  languageData: LanguageData,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Keyboard(props: KeyboardProps) {
  const { languageData, onClick } = props;
  const { rows, columns } = languageData;
  const characters = Object.entries(languageData.characters);

  const keyboardRows = [];

  for (let y = 0; y < rows; y++) {
    const keyboardColumns = [];

    for (let x = 0; x < columns; x++) {
      const character = characters.find(item => item[1].x === x && item[1].y === y);
      keyboardColumns.push(
        <td key={x}>{character ? <KeyboardKey to={character[1].to} from={character[0]} onClick={onClick} /> : null}</td>
      );
    }

    keyboardRows.push(<tr key={y}>{keyboardColumns}</tr>)
  }

  return (
    <table className={styles.keyboard}>
      <tbody>{keyboardRows}</tbody>
    </table>
  )
}

interface KeyboardKeyProps {
  to: string,
  from: string,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function KeyboardKey(props: KeyboardKeyProps) {
  const { from, to, onClick } = props;
  return <button data-to={to} onClick={onClick}>
    <span className={styles.to}>{to}</span>
    <span className={styles.from}>{from}</span>
  </button>
}
