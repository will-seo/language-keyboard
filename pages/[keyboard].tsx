import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import BasePage from '../components/Base';
import FAQs from '../components/FAQs';
import Keyboard from '../components/Keyboard';
import TextArea from '../components/TextArea';
import styles from '../styles/Keyboard.module.css';
import { LanguageData, LanguageModeData } from '../types';
import { getLanguages, loadLanguage } from '../utils/languages';

interface LanguageModeProcessedData extends LanguageModeData {
  allowed: string[];
  bufferMax: number;
  columns: number;
  rows: number;
}

interface KeyboardModeSwitcherProps {
  current: LanguageModeProcessedData;
  modes: LanguageModeProcessedData[];
  setMode: Dispatch<SetStateAction<LanguageModeProcessedData>>;
  textAreaRef: RefObject<HTMLTextAreaElement>;
}

const KeyboardModeSwitcher = (props: KeyboardModeSwitcherProps) => {
  const { current, modes, setMode, textAreaRef } = props;
  const onClick = (mode: LanguageModeProcessedData) => {
    setMode(mode);
    if (textAreaRef.current) textAreaRef.current.focus();
  };
  return (
    <nav className={styles.keyboardModeSwitcher}>
      {modes.map((mode, key) => (
        <button
          data-active={current === mode}
          key={key}
          onClick={() => onClick(mode)}
        >
          {mode.name}
        </button>
      ))}
    </nav>
  );
};

interface KeyboardCopyButtonProps {
  text: string;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  copiedDuration?: number;
}

const KeyboardCopyButton = ({
  text,
  textAreaRef,
  copiedDuration = 500,
}: KeyboardCopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    if (textAreaRef.current) textAreaRef.current.select();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, copiedDuration);
  };
  return <button onClick={onClick}>📄 {copied ? 'Copied!' : 'Copy'}</button>;
};

interface KeyboardPageProps extends LanguageData {
  modes: LanguageModeProcessedData[];
}

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const { language, description, faqs, modes } = props;
  const [text, setText] = useState('');
  const [mode, setMode] = useState(modes[0]);
  const [caret, setCaret] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const title = `${language} Language Keyboard`;

  useEffect(() => {
    if (textAreaRef.current)
      textAreaRef.current.setSelectionRange(caret, caret);
  }, [textAreaRef, caret, text]);

  const updateText = (insertText: string, startOffset = 0) => {
    if (!textAreaRef.current || !insertText) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    textAreaRef.current.focus();
    const [start, end] = [selectionStart - startOffset, selectionEnd];
    setCaret(start + 1);
    setText(text.slice(0, start) + insertText + text.slice(end));
  };

  const onChange = () => {
    if (!textAreaRef.current) return;
    setCaret(textAreaRef.current.selectionStart);
    setText(textAreaRef.current.value);
  };

  return (
    <BasePage title={title} description={description} faqs={faqs}>
      <div className={styles.keyboardActions}>
        <KeyboardModeSwitcher
          current={mode}
          modes={modes}
          setMode={setMode}
          textAreaRef={textAreaRef}
        />
        <KeyboardCopyButton text={text} textAreaRef={textAreaRef} />
      </div>
      <TextArea
        text={text}
        language={`${language} ${mode.name}`}
        dictionary={mode.dictionary}
        allowed={mode.allowed}
        bufferMax={mode.bufferMax}
        textAreaRef={textAreaRef}
        updateText={updateText}
        onChange={onChange}
      />
      <Keyboard
        layout={mode.layout}
        rows={mode.rows}
        columns={mode.columns}
        updateText={updateText}
      />
      <FAQs faqs={faqs} />
    </BasePage>
  );
};

interface KeyboardPageParams extends ParsedUrlQuery {
  keyboard: string;
}

export const getStaticProps: GetStaticProps<
  KeyboardPageProps,
  KeyboardPageParams
> = async (context) => {
  const { keyboard } = context.params as KeyboardPageParams;
  const data = loadLanguage(keyboard);
  const { language, description, faqs } = data;

  const modes = data.modes.map((mode) => {
    const words = Object.keys(mode.dictionary);
    const allowed = Array.from(new Set(words.join(''))).sort();
    const bufferMax = Math.max(...words.map((word) => word.length - 1), 0);
    const columns = Math.max(...mode.layout.map((key) => key.x + 1), 0);
    const rows = Math.max(...mode.layout.map((key) => key.y + 1), 0);
    return {
      name: mode.name,
      dictionary: mode.dictionary,
      layout: mode.layout,
      allowed,
      bufferMax,
      columns,
      rows,
    };
  });

  return {
    props: {
      language,
      description,
      faqs,
      modes,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getLanguages().map((filename) => {
    return { params: { keyboard: filename } };
  });
  return { paths, fallback: false };
};

export default KeyboardPage;
