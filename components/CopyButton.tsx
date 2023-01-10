import { RefObject, useState } from 'react';

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
  return <button onClick={onClick}>📄 {copied ? 'Copied!' : 'Copy'}</button>;
};

export default CopyButton;
