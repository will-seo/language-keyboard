import { RefObject } from 'react';
import styles from '../styles/TextArea.module.css';

interface TextAreaProps {
  text: string;
  placeholder?: string;
  mobileKeyboard?: boolean;
  rightToLeft?: boolean;
  backspaceToSpace?: boolean;
  dictionary: { [key: string]: string };
  allowed: string[];
  bufferMax: number;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  updateText: (insertText: string, offset?: number) => void;
  handleChange: () => void;
}

const getLongest = (words: string[]): string =>
  words.reduce((previous, current) => (previous.length < current.length ? current : previous), '');

const sliceBuffer = (text: string, before: number, maxLength: number) =>
  text.slice(Math.max(before - maxLength, 0), before);

const getMatches = (buffer: string, words: string[]) => {
  const potential: string[] = [];
  const exact: string[] = [];
  for (let pos = 0; pos < buffer.length; pos += 1) {
    const bufferSlice = buffer.slice(buffer.length - 1 - pos, buffer.length);
    words.forEach((word) => {
      const wordSlice = word.slice(0, pos + 1);
      if (wordSlice === bufferSlice) {
        if (word === bufferSlice) exact.push(word);
        else potential.push(word);
      }
    });
  }
  return {
    longestExact: getLongest(exact),
    longestPotential: getLongest(potential),
    potential,
  };
};

const getBufferWithInput = (buffer: string, bufferMax: number) => sliceBuffer(buffer, buffer.length, bufferMax);

const checkBuffer = (
  dictionary: { [key: string]: string },
  buffer: string,
  input: string,
  allowed: string[],
  bufferMax: number,
) => {
  const inputValid = allowed.includes(input);
  const words = Object.keys(dictionary);
  const matches = getMatches(buffer, words);

  if (!inputValid && matches.longestExact) {
    return {
      text: dictionary[matches.longestExact] + input,
      offset: matches.longestExact.length,
    };
  }

  if (!inputValid) return null;

  const bufferWithInput = getBufferWithInput(buffer + input, bufferMax);
  const matchesWithInput = getMatches(bufferWithInput, words);

  if (
    matches.longestExact &&
    matchesWithInput.longestExact &&
    !matches.potential.includes(matchesWithInput.longestExact)
  ) {
    return {
      text: dictionary[matches.longestExact] + dictionary[matchesWithInput.longestExact],
      offset: matches.longestExact.length + matchesWithInput.longestExact.length - input.length,
    };
  }

  if (
    matchesWithInput.longestExact &&
    matchesWithInput.longestExact.length >= matchesWithInput.longestPotential.length
  ) {
    return {
      text: dictionary[matchesWithInput.longestExact],
      offset: matchesWithInput.longestExact.length - input.length,
    };
  }

  if (matches.longestExact && !matchesWithInput.potential.includes(matches.longestExact)) {
    return {
      text: dictionary[matches.longestExact] + input,
      offset: matches.longestExact.length,
    };
  }

  return null;
};

const TextArea = ({
  text,
  placeholder,
  mobileKeyboard,
  rightToLeft,
  backspaceToSpace,
  dictionary,
  allowed,
  bufferMax,
  textAreaRef,
  updateText,
  handleChange,
}: TextAreaProps) => {
  const onBeforeInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const { data } = e.nativeEvent;
    const input = data || ' ';
    const selectionStart = textAreaRef.current?.selectionStart || 0;
    const text = textAreaRef.current?.value || '';
    const buffer = sliceBuffer(text, selectionStart, bufferMax);
    const replace = checkBuffer(dictionary, buffer, input, allowed, bufferMax);
    if (replace) {
      e.preventDefault();
      updateText(replace.text, replace.offset);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = e.nativeEvent;
    if (!(key === 'Backspace' && backspaceToSpace) || !textAreaRef.current) return;

    const selectionStart = textAreaRef.current.selectionStart || 0;
    const selectionEnd = textAreaRef.current.selectionEnd || 0;
    if (selectionStart !== selectionEnd) return;

    const before = text.slice(0, selectionStart || text.length - 1);
    const match = before.match(/\S+\s*$/);
    const index = match?.index;
    if (index === undefined) return;

    e.preventDefault();
    textAreaRef.current.value = text.slice(0, index);
    handleChange();
  };

  return (
    <textarea
      className={styles.textArea}
      placeholder={placeholder || 'Start typing'}
      value={text}
      onChange={() => handleChange()}
      onBeforeInput={onBeforeInput}
      onKeyDown={onKeyDown}
      ref={textAreaRef}
      inputMode={mobileKeyboard ? 'text' : 'none'}
      aria-label="Input Method Editor"
      dir={rightToLeft ? 'rtl' : 'ltr'}
    ></textarea>
  );
};

export default TextArea;
