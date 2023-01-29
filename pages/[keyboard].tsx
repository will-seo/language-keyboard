import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import ControlButtons from '../components/ControlButtons';
import FAQs from '../components/FAQ';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import ModeSwitcher from '../components/ModeSwitcher';
import ModifierSwitcher from '../components/ModifierSwitcher';
import TextArea from '../components/TextArea';
import styles from '../styles/Keyboard.module.css';
import { LanguageData, LanguageModeProcessed, PageProps } from '../types';
import { getGlobalContext } from '../utils/context';
import { getLanguages, hasModifiers, loadLanguage } from '../utils/languages';

interface KeyboardPageProps extends PageProps, LanguageData {
  modes: LanguageModeProcessed[];
}

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const { globalContext, language, h1, placeholder, mobileKeyboard, copy, spacebar, backspace, meta, faqs, modes } =
    props;

  const [text, setText] = useState('');
  const [mode, setMode] = useState(modes[0]);
  const [caret, setCaret] = useState(0);
  const [capsLockKey, setCapsLockKey] = useState(false);
  const [shiftKey, setShiftKey] = useState(false);
  const [capsLockKeyOverride, setCapsLockKeyOverride] = useState(false);
  const [shiftKeyOverride, setShiftKeyOverride] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Update available modes and reset text on route change
  useEffect(() => {
    setMode(modes[0]);
    setText('');
    textAreaRef.current?.focus();
  }, [modes]);

  // Update caret position on text change
  useEffect(() => {
    textAreaRef.current?.setSelectionRange(caret, caret);
  }, [textAreaRef, caret, text]);

  // Check status of caps lock and shift keys when any key is pressed
  useEffect(() => {
    window.addEventListener('keydown', handKeyPress);
    window.addEventListener('keyup', handKeyPress);
    return () => {
      window.removeEventListener('keydown', handKeyPress);
      window.removeEventListener('keyup', handKeyPress);
    };
  }, []);

  const handKeyPress = (e: KeyboardEvent) => {
    setShiftKey(e.shiftKey);
    setCapsLockKey(e.getModifierState('CapsLock'));
  };

  const updateText = (insertText: string, startOffset = 0, caretOffset = 1) => {
    if (!textAreaRef.current) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const [start, end] = [selectionStart - startOffset, selectionEnd];
    setCaret(start + caretOffset);
    setText(text.slice(0, start) + insertText + text.slice(end));
    textAreaRef.current.focus();
  };

  const handleChangeMode = (key: number) => {
    const newMode = modes.find((mode) => mode.key === key);
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
    <Layout globalContext={globalContext} h1={h1} meta={meta} faqs={faqs}>
      <TextArea
        text={text}
        language={language}
        placeholder={placeholder}
        mobileKeyboard={mobileKeyboard}
        dictionary={mode.dictionary}
        allowed={mode.allowed}
        bufferMax={mode.bufferMax}
        textAreaRef={textAreaRef}
        updateText={updateText}
        handleChange={handleChangeText}
      />
      <Keyboard
        layout={mode.layout}
        shift={shiftKey || shiftKeyOverride}
        capsLock={capsLockKey || capsLockKeyOverride}
        updateText={updateText}
      />
      <div className={styles.keyboardActions}>
        <ModeSwitcher currentMode={mode} allModes={modes} handleChange={handleChangeMode} />
        <ModifierSwitcher
          currentMode={mode}
          shiftKeyOverride={shiftKeyOverride}
          capsLockKeyOverride={capsLockKeyOverride}
          handleChangeShift={(status) => setShiftKeyOverride(status)}
          handleChangeCapsLock={(status) => setCapsLockKeyOverride(status)}
        />
        <ControlButtons
          textAreaRef={textAreaRef}
          updateText={updateText}
          copy={copy}
          spacebar={spacebar}
          backspace={backspace}
        />
      </div>
      <FAQs faqs={faqs} />
    </Layout>
  );
};

interface KeyboardPageParams extends ParsedUrlQuery {
  keyboard: string;
}

export const getStaticProps: GetStaticProps<KeyboardPageProps, KeyboardPageParams> = async (context) => {
  const { keyboard } = context.params as KeyboardPageParams;
  const globalContext = getGlobalContext();

  const data = loadLanguage(keyboard);
  const { h1, language } = data;
  const placeholder = data.placeholder || '';
  const mobileKeyboard = data.mobileKeyboard ?? true;
  const copy = data.copy ?? true;
  const spacebar = data.spacebar ?? true;
  const backspace = data.backspace ?? true;
  const meta = data.meta || {};
  const faqs = data.faqs || [];

  const modes = data.modes.map((mode, key) => {
    const words = Object.keys(mode.dictionary);
    const allowed = Array.from(new Set(words.join(''))).sort();
    const bufferMax = Math.max(...words.map((word) => word.length - 1), 0);
    const [capsLock, shift] = hasModifiers(mode.layout);
    return {
      key,
      allowed,
      bufferMax,
      capsLock,
      shift,
      ...mode,
    };
  });

  return {
    props: {
      ...globalContext,
      language,
      h1,
      placeholder,
      mobileKeyboard,
      copy,
      spacebar,
      backspace,
      meta,
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
