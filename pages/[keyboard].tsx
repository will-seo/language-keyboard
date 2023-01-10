import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import CopyButton from '../components/CopyButton';
import FAQs from '../components/FAQ';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import ModeSwitcher from '../components/ModeSwitcher';
import TextArea from '../components/TextArea';
import styles from '../styles/Keyboard.module.css';
import { LanguageData, LanguageModeProcessed, PageProps } from '../types';
import { getLanguages, loadLanguage } from '../utils/languages';
import { getMenu } from '../utils/menu';

interface KeyboardPageProps extends PageProps, LanguageData {
  modes: LanguageModeProcessed[];
}

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const { menu, language, description, faqs, modes } = props;

  const [text, setText] = useState('');
  const [mode, setMode] = useState(modes[0]);
  const [caret, setCaret] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const title = `${language} Keyboard`;

  useEffect(() => {
    setMode(modes[0]);
    textAreaRef.current?.focus();
  }, [modes]);

  useEffect(() => {
    textAreaRef.current?.setSelectionRange(caret, caret);
  }, [textAreaRef, caret, text]);

  const updateText = (insertText: string, startOffset = 0) => {
    if (!textAreaRef.current || !insertText) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    textAreaRef.current.focus();
    const [start, end] = [selectionStart - startOffset, selectionEnd];
    setCaret(start + 1);
    setText(text.slice(0, start) + insertText + text.slice(end));
  };

  const handleChangeMode = (modeName: string) => {
    const newMode = modes.find((mode) => mode.name === modeName);
    if (!newMode) return;
    setMode(newMode);
    textAreaRef.current?.focus();
  };

  const handleChangeText = () => {
    if (!textAreaRef.current) return;
    setCaret(textAreaRef.current.selectionStart);
    setText(textAreaRef.current.value);
  };

  return (
    <Layout title={title} description={description} faqs={faqs} menu={menu}>
      <div className={styles.actions}>
        <ModeSwitcher
          currentModeName={mode.name}
          modeNames={modes.map((mode) => mode.name)}
          handleChange={handleChangeMode}
        />
        <CopyButton textAreaRef={textAreaRef} />
      </div>
      <TextArea
        text={text}
        language={language}
        dictionary={mode.dictionary}
        allowed={mode.allowed}
        bufferMax={mode.bufferMax}
        textAreaRef={textAreaRef}
        updateText={updateText}
        handleChange={handleChangeText}
      />
      <Keyboard
        layout={mode.layout}
        rows={mode.rows}
        columns={mode.columns}
        updateText={updateText}
      />
      <FAQs faqs={faqs} />
    </Layout>
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
  const menu = getMenu();

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
      menu,
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
