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
  dictionary,
  textAreaRef,
  updateText,
  handleChange,
  setLastInput,
}: TextAreaProps) => {
  const lastCharacterMap = useMemo(() => getTranslationsByInputLastLetter(dictionary), [dictionary]);

  const onBeforeInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
    // When the user types a character, check if it matches the last letter of
    // words in the dictionary
    if (!textAreaRef.current) return;

    const { data } = e.nativeEvent;
    if (!data || !(data in lastCharacterMap)) {
      setLastInput(data || '');
      return;
    }

    // Work out what the text would look like with the input character
    const { selectionStart, selectionEnd, value } = textAreaRef.current;
    const textWithInput = value.slice(0, selectionStart) + data + value.slice(selectionEnd);
    const words = lastCharacterMap[data];

    // Go through the words which end with the input character, and check the
    // previous characters to see if any of the words completely match
    for (let index = 0; index < words.length; index++) {
      const { word, translation } = words[index];
      const buffer = textWithInput.slice(Math.max(selectionStart - word.length + 1, 0), selectionStart + 1);

      // If the text preceding the cursor matches a full word, replace it with
      // the translation and stop looking for more matches
      if (buffer.endsWith(word)) {
        e.preventDefault();
        updateText(translation, word.length - 1);
        setLastInput(translation);
        return;
      }
    }

    setLastInput(data);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If backspaceRemoveWord is true, pressing backspace will delete the
    // previous word instead of a single character
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
      ref={textAreaRef}
      inputMode={mobileKeyboard ? 'text' : 'none'}
      aria-label="Input Method Editor"
      dir={rightToLeft ? 'rtl' : 'ltr'}
      id="textarea"
    ></textarea>
  );
};

export default TextArea;
