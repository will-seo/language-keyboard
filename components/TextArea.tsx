import { Ref } from 'react';
import styles from '../styles/TextArea.module.css';

interface TextAreaProps {
  text: string;
  language: string;
  dictionary: { [key: string]: string };
  allowed: string[];
  bufferMax: number;
  textAreaRef: Ref<HTMLTextAreaElement>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
    allowed,
    bufferMax,
    onChange,
    textAreaRef,
  } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.altKey || e.ctrlKey || e.metaKey;
    if (modifier || !allowed.includes(e.key)) return;

    const target = e.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const buffer =
      target.value.slice(
        Math.max(selectionStart - bufferMax, 0),
        selectionStart,
      ) + e.key;
    const keys = Object.keys(dictionary);
    const replaceCharacters = checkBuffer(keys, buffer, allowed);
    if (!replaceCharacters) return;

    const replaceWith = dictionary[replaceCharacters];
    const replaceStart = selectionStart - replaceCharacters.length + 1;
    target.setRangeText(replaceWith, replaceStart, selectionEnd, 'end');
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <textarea
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={styles.textArea}
      ref={textAreaRef}
      rows={5}
      placeholder={`Start typing to convert to ${language}`}
    ></textarea>
  );
};

TextArea.whyDidYouRender = true;

export default TextArea;
