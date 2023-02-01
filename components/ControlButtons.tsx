import { faArrowLeftLong, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RefObject, useState } from 'react';
import buttonStyles from '../styles/Button.module.css';

interface ControlButtonsProps {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  updateText: (insertText: string, offset?: number) => void;
  copy?: boolean;
  spacebar?: boolean;
  backspace?: boolean;
  copiedDuration?: number;
}

const ControlButtons = ({
  textAreaRef,
  updateText,
  copy,
  spacebar,
  backspace,
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
    updateText(' ', 0);
  };

  const onClickBackspace = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.focus();
    textAreaRef.current.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    const { selectionStart, selectionEnd } = textAreaRef.current;
    if (selectionEnd === 0) return;
    const offset = selectionStart === selectionEnd ? 1 : 0;
    updateText('', offset);
  };

  return (
    <div className={buttonStyles.group}>
      {copy && (
        <button onClick={onClickCopy} className={`${buttonStyles.button} ${buttonStyles.iconButton}`}>
          <FontAwesomeIcon icon={faCopy} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}

      {spacebar && (
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
