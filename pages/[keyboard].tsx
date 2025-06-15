import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import AdSlot from '../components/AdSlot';
import ControlButtons from '../components/ControlButtons';
import FAQs from '../components/FAQ';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import MobileKeyboardSwitcher from '../components/MobileKeyboardSwitcher';
import ModeSwitcher from '../components/ModeSwitcher';
import ModifierSwitcher from '../components/ModifierSwitcher';
import TextArea from '../components/TextArea';
import styles from '../styles/Keyboard.module.css';
import { LanguageData, LanguageModeProcessed, PageProps } from '../types';
import { getLanguageContext } from '../utils/context';
import { getLanguages } from '../utils/languages';

export interface KeyboardPageProps extends PageProps, LanguageData {
  modes: LanguageModeProcessed[];
}

const activeKeyDuration = 100; // ms

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const {
    globalContext,
    h1,
    placeholder,
    copy,
    backspace,
    backspaceRemoveWord,
    meta,
    faqs,
    modes,
    rightToLeft,
    mobileKeyboardToggle,
    spacebarCharacter = ' ',
  } = props;

  const [text, setText] = useState('');
  const [mode, setMode] = useState(modes[0]);
  const [caret, setCaret] = useState(0);
  const [capsLockKey, setCapsLockKey] = useState(false);
  const [shiftKey, setShiftKey] = useState(false);
  const [capsLockKeyOverride, setCapsLockKeyOverride] = useState(false);
  const [shiftKeyOverride, setShiftKeyOverride] = useState(false);
  const [mobileKeyboard, setMobileKeyboard] = useState(props.mobileKeyboard || false);
  const [lastInput, setLastInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

  // Reset active key after delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (lastInput)
      timeoutId = setTimeout(() => {
        setLastInput('');
      }, activeKeyDuration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastInput]);

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

  const handleKeyboardKeyClick = (insertText: string) => {
    updateText(insertText);
    if (shiftKeyOverride) setShiftKeyOverride(false);
  };

  const updateText = (insertText: string, offset = 0) => {
    if (!textAreaRef.current) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const start = selectionStart - offset;
    setCaret(start + insertText.length);
    setText(text.slice(0, start) + insertText + text.slice(selectionEnd));
    textAreaRef.current.focus();
  };

  const handleChangeMode = (key: number) => {
    const newMode = modes.find((mode) => mode.key === key);
    if (!newMode) return;
    setMode(newMode);
    textAreaRef.current?.focus();
  };

  const handleChangeMobileKeyboard = (status: boolean) => {
    setMobileKeyboard(status);
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
        placeholder={placeholder}
        mobileKeyboard={mobileKeyboard}
        rightToLeft={rightToLeft}
        backspaceRemoveWord={backspaceRemoveWord}
        spacebarCharacter={spacebarCharacter}
        dictionary={mode.dictionary}
        textAreaRef={textAreaRef}
        updateText={updateText}
        handleChange={handleChangeText}
        setLastInput={setLastInput}
      />
      <Keyboard
        layout={mode.layout}
        shift={shiftKey || shiftKeyOverride}
        capsLock={capsLockKey || capsLockKeyOverride}
        handleKeyboardKeyClick={handleKeyboardKeyClick}
        lastInput={lastInput}
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
        <MobileKeyboardSwitcher
          mobileKeyboard={mobileKeyboard}
          mobileKeyboardToggle={mobileKeyboardToggle}
          handleChange={handleChangeMobileKeyboard}
        />
        <ControlButtons
          textAreaRef={textAreaRef}
          updateText={updateText}
          copy={copy}
          spacebarCharacter={spacebarCharacter}
          backspace={backspace}
          backspaceRemoveWord={backspaceRemoveWord}
        />
      </div>
      <AdSlot />
      <FAQs faqs={faqs} />
    </Layout>
  );
};

interface KeyboardPageParams extends ParsedUrlQuery {
  keyboard: string;
}

export const getStaticProps: GetStaticProps<KeyboardPageProps, KeyboardPageParams> = async (context) => {
  const { keyboard } = context.params as KeyboardPageParams;
  return {
    props: getLanguageContext(keyboard),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getLanguages().map((filename) => {
    return { params: { keyboard: filename } };
  });
  return { paths, fallback: false };
};

export default KeyboardPage;
