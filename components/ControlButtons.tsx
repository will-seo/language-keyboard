import { faArrowLeftLong, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RefObject, useState } from 'react';
import buttonStyles from '../styles/Button.module.css';
import { getBackspaceToSpaceIndex } from '../utils/text';

interface ControlButtonsProps {
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  updateText: (insertText: string, offset?: number) => void;
  copy?: boolean;
  spacebarCharacter?: string;
  backspace?: boolean;
  backspaceToSpace?: boolean;
  copiedDuration?: number;
}

const ControlButtons = ({
  textAreaRef,
  updateText,
  copy,
  spacebarCharacter,
  backspace,
  backspaceToSpace,
  copiedDuration = 500,
}: ControlButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const onClickCopy = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.select();
    navigator.clipboard.writeText(textAreaRef.current.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, copiedDuration);
  };

  const onClickSpacebar = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.focus();
    updateText(spacebarCharacter || ' ', 0);
  };

  const getOffset = (selectionStart: number, selectionEnd: number) => {
    const text = textAreaRef.current?.value || '';
    if (selectionStart !== selectionEnd || !text) return 0;
    const index = getBackspaceToSpaceIndex(text, selectionStart);
    return selectionStart - index;
  };

  const onClickBackspace = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.focus();
    textAreaRef.current.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    const { selectionStart, selectionEnd } = textAreaRef.current;
    updateText('', getOffset(selectionStart, selectionEnd));
  };

  return (
    <div className={buttonStyles.group}>
      {copy && (
        <button onClick={onClickCopy} className={`${buttonStyles.button} ${buttonStyles.iconButton}`}>
          <FontAwesomeIcon icon={faCopy} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}

      {spacebarCharacter && (
        <button onClick={onClickSpacebar} className={`${buttonStyles.button} ${buttonStyles.iconButton}`}>
          <span className={buttonStyles.spacebar}>⎵</span>
          Space
        </button>
      )}

      {backspace && (
        <button onClick={onClickBackspace} className={`${buttonStyles.button} ${buttonStyles.iconButton}`}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
          Backspace
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
