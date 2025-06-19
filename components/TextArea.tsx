import { RefObject, useMemo } from 'react';
import styles from '../styles/TextArea.module.css';
import { getbackspaceRemoveWordIndex } from '../utils/text';
import { LetterToWordMap, LanguageMode } from '../types';

interface TextAreaProps {
  text: string;
  placeholder?: string;
  mobileKeyboard?: boolean;
  rightToLeft?: boolean;
  backspaceRemoveWord?: boolean;
  spacebarCharacter: string;
  dictionary: LanguageMode['dictionary'];
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  updateText: (insertText: string, offset?: number) => void;
  setLastInput: (input: string) => void;
  handleChange: () => void;
}

const getTranslationsByInputLastLetter = (dictionary: LanguageMode['dictionary']): LetterToWordMap => {
  // Create a mapping from source word last letters to source words
  const mapping = Object.entries(dictionary).reduce((acc, [word, translation]) => {
    const lastLetter = word.slice(-1);
    acc[lastLetter] = acc[lastLetter] || [];
    acc[lastLetter].push({ word, translation });
    return acc;
  }, {} as LetterToWordMap);

  // Sort by word length in descending order, so we match longer words first
  Object.values(mapping).forEach((arr) => arr.sort((a, b) => b.word.length - a.word.length));
  return mapping;
};

const TextArea = ({
  text,
  placeholder,
  mobileKeyboard,
  rightToLeft,
  backspaceRemoveWord,
  spacebarCharacter,
  dictionary,
  textAreaRef,
  updateText,
  handleChange,
  setLastInput,
}: TextAreaProps) => {
  const lastCharacterMap = useMemo(() => getTranslationsByInputLastLetter(dictionary), [dictionary]);

  const processInput = (text: string, pressedKey: string, caret: number): [string | null, number] => {
    if (!(pressedKey in lastCharacterMap)) return [null, 0];

    const words = lastCharacterMap[pressedKey];

    // Go through the words which end with the input character, and check the
    // previous characters to see if any of the words completely match
    for (let index = 0; index < words.length; index++) {
      const { word, translation } = words[index];
      const buffer = text.slice(Math.max(caret - word.length + 1, 0), caret + 1);

      // If the text preceding the cursor matches a full word, return the
      // translation and the number of characters to replace, and stop looking
      // for more matches
      if (buffer.endsWith(word)) return [translation, word.length - 1];
    }

    return [null, 0];
  };

  // When the user types an input character, check if it matches the last letter
  // of words in the dictionary
  const onBeforeInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;

    const { data } = e.nativeEvent;

    // Handle spacebar press
    if (data === undefined || data === null) {
      e.preventDefault();
      updateText(spacebarCharacter);
      setLastInput(spacebarCharacter);
      return;
    }

    // If the input isn't the last character of a word in the dictionary then
    // exit early as there's no point in checking for matches
    if (!(data in lastCharacterMap)) {
      setLastInput(data);
      return;
    }

    // Work out what the text will look like with the input character
    const { selectionStart, selectionEnd, value } = textAreaRef.current;
    const textWithInput = value.slice(0, selectionStart) + data + value.slice(selectionEnd);
    const [translation, offset] = processInput(textWithInput, data, selectionStart);
    if (translation !== null) {
      e.preventDefault();
      updateText(translation, offset);
      setLastInput(translation);
      return;
    }

    setLastInput(data);
  };

  // If the user pastes some text, we process it character by character as if
  // they were typing it
  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;

    e.preventDefault();
    setLastInput('');

    const input = e.clipboardData.getData('text/plain');
    let output = '';
    input.split('').forEach((char) => {
      output += char;
      const caret = output.length - 1;
      const [translation, offset] = processInput(output, char, caret);
      if (translation !== null) output = output.slice(0, caret - offset) + translation;
    });

    updateText(output);
  };

  // If backspaceRemoveWord is true, pressing backspace will delete the previous
  // word instead of a single character
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.nativeEvent.key === 'Backspace') || !backspaceRemoveWord || !textAreaRef.current) return;

    const selectionStart = textAreaRef.current.selectionStart || 0;
    const selectionEnd = textAreaRef.current.selectionEnd || 0;
    if (selectionStart !== selectionEnd) return;

    e.preventDefault();
    const index = getbackspaceRemoveWordIndex(text, selectionStart);
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
      onPaste={onPaste}
      ref={textAreaRef}
      inputMode={mobileKeyboard ? 'text' : 'none'}
      aria-label="Input Method Editor"
      dir={rightToLeft ? 'rtl' : 'ltr'}
      id="textarea"
    ></textarea>
  );
};

export default TextArea;
