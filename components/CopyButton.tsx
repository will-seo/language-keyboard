import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RefObject, useState } from 'react';
import buttonStyles from '../styles/Button.module.css';

interface CopyButtonProps {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  copiedDuration?: number;
}

const CopyButton = ({ textAreaRef, copiedDuration = 500 }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.select();
    navigator.clipboard.writeText(textAreaRef.current.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, copiedDuration);
  };
  return (
    <button onClick={onClick} className={`${buttonStyles.button} ${buttonStyles.iconButton}`}>
      <FontAwesomeIcon icon={faCopy} />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

export default CopyButton;
