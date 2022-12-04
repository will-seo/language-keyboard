import { CharacterDataType, DataType } from '../utils/types';
import { getCharacterFromData } from '../utils/data';
import { MouseEvent } from 'react';
import styles from '../styles/Home.module.css'

interface KeyboardProps {
  data: DataType,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Keyboard(props: KeyboardProps) {
  const { data, onClick } = props;
  const { rows, columns } = data;

  const keyboardRows = [];

  for (let y = 0; y < rows; y++) {
    const keyboardColumns = [];

    for (let x = 0; x < columns; x++) {
      const character = getCharacterFromData(data, x, y);
      keyboardColumns.push(<td key={x}>{character ? <KeyboardKey character={character} onClick={onClick} /> : null}</td>);
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
  character: CharacterDataType,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function KeyboardKey(props: KeyboardKeyProps) {
  const { character, onClick } = props;
  return <button data-to={character.to} onClick={onClick}>
    <span className={styles.to}>{character.to}</span>
    <span className={styles.from}>{character.from}</span>
  </button>
}
