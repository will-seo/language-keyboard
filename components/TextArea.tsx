import { RefObject } from 'react';
import styles from '../styles/TextArea.module.css';

interface TextAreaProps {
  text: string;
  language: string;
  dictionary: { [key: string]: string };
  keyLookup: { [key: string]: string };
  allowed: string[];
  bufferMax: number;
  capsLock: boolean;
  shift: boolean;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  updateText: (insertText: string, startOffset: number) => void;
  handleChange: () => void;
}

const cleanBuffer = (buffer: string, allowed: string[]) => {
  let cleaned = '';
  for (let position = buffer.length - 1; position >= 0; position--) {
    const character = buffer[position];
    if (!allowed.includes(character)) return cleaned;
    cleaned = character + cleaned;
  }
  return buffer;
};

const checkBuffer = (keys: string[], buffer: string, allowed: string[]) => {
  const cleanedBuffer = cleanBuffer(buffer, allowed);
  const fullMatches = [];
  let partialMatches = [...keys];

  for (let position = 0; position < cleanedBuffer.length; position++) {
    const bufferCharacter = cleanedBuffer[cleanedBuffer.length - 1 - position];
    const newPartialMatches = [];

    for (let index = 0; index < partialMatches.length; index++) {
      const key = partialMatches[index];
      const checkPosition = key.length - 1 - position;
      const character = key[checkPosition];
      if (character !== bufferCharacter) continue;
      if (key.length === position + 1) fullMatches.push(key);
      else newPartialMatches.push(key);
    }

    partialMatches = newPartialMatches;
  }

  return fullMatches.sort((a, b) => b.length - a.length)[0];
};

const TextArea = (props: TextAreaProps) => {
  const {
    text,
    language,
    dictionary,
    keyLookup,
    allowed,
    bufferMax,
    capsLock,
    shift,
    textAreaRef,
    updateText,
    handleChange,
  } = props;

  const checkUppercase = (key: string) => (shift ? keyLookup[key] : key) || key;

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.altKey || e.ctrlKey || e.metaKey;
    // const key = capsLock ? e.key.toUpperCase() : e.key;
    if (!textAreaRef.current || modifier || !allowed.includes(e.key)) return;
    const key = checkUppercase(e.key);
    const { selectionStart } = textAreaRef.current;
    const buffer =
      (bufferMax ? textAreaRef.current.value.slice(Math.max(selectionStart - bufferMax, 0), selectionStart) : '') + key;
    console.log(buffer);
    const keys = Object.keys(dictionary);
    const replace = checkBuffer(keys, buffer, allowed);
    if (!replace) return;
    e.preventDefault();
    e.stopPropagation();
    updateText(dictionary[replace], replace.length - 1);
  };

  return (
    <textarea
      className={styles.textArea}
      placeholder={`Start typing to convert to ${language}`}
      value={text}
      onChange={() => handleChange()}
      onKeyDown={onKeyDown}
      ref={textAreaRef}
    ></textarea>
  );
};

export default TextArea;
