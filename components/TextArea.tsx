import { RefObject } from 'react';
import styles from '../styles/TextArea.module.css';

interface TextAreaProps {
  text: string;
  language: string;
  placeholder?: string;
  mobileKeyboard?: boolean;
  dictionary: { [key: string]: string };
  allowed: string[];
  bufferMax: number;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  updateText: (insertText: string, startOffset: number, caretOffset?: number) => void;
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
    placeholder,
    mobileKeyboard,
    dictionary,
    allowed,
    bufferMax,
    textAreaRef,
    updateText,
    handleChange,
  } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.altKey || e.ctrlKey || e.metaKey;
    const key = e.key;
    if (!textAreaRef.current || modifier || !allowed.includes(key)) return;
    const { selectionStart } = textAreaRef.current;
    const buffer = bufferMax
      ? textAreaRef.current.value.slice(Math.max(selectionStart - bufferMax, 0), selectionStart)
      : '';
    const keys = Object.keys(dictionary);
    const replace = checkBuffer(keys, buffer + key, allowed);
    if (!replace) return;
    e.preventDefault();
    e.stopPropagation();
    updateText(dictionary[replace], replace.length - 1);
  };

  return (
    <textarea
      className={styles.textArea}
      placeholder={placeholder || `Start typing to convert to ${language}`}
      value={text}
      onChange={() => handleChange()}
      onKeyDown={onKeyDown}
      ref={textAreaRef}
      inputMode={mobileKeyboard ? 'text' : 'none'}
    ></textarea>
  );
};

export default TextArea;
