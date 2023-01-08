import fs from 'fs';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import BasePage from '../components/Base';
import Keyboard from '../components/Keyboard';
import TextArea from '../components/TextArea';
import { LanguageData, LanguageModeData } from '../types';

interface LanguageModeProcessedData extends LanguageModeData {
  allowed: string[];
  bufferMax: number;
  columns: number;
  rows: number;
}

interface ModeSwitcherProps {
  current: LanguageModeProcessedData;
  modes: LanguageModeProcessedData[];
  setMode: Dispatch<SetStateAction<LanguageModeProcessedData>>;
}

const ModeSwitcher = (props: ModeSwitcherProps) => {
  const { current, modes, setMode } = props;
  const onClick = (mode: LanguageModeProcessedData) => {
    setMode(mode);
  };
  return (
    <nav>
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

interface KeyboardPageProps extends LanguageData {
  modes: LanguageModeProcessedData[];
}

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const { language, description, faqs, modes } = props;
  const [text, setText] = useState('');
  const [mode, setMode] = useState(modes[0]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const title = `${language} Language Keyboard`;

  const updateText = (insertText: string, startOffset = 0) => {
    if (!textAreaRef.current || !insertText) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    textAreaRef.current.focus();
    const [start, end] = [selectionStart - startOffset, selectionEnd];
    setText(text.slice(0, start) + insertText + text.slice(end));
    textAreaRef.current.setSelectionRange(start, start);
  };

  const onChange = () => {
    if (textAreaRef.current) setText(textAreaRef.current.value);
  };

  return (
    <BasePage title={title} description={description} faqs={faqs}>
      <ModeSwitcher current={mode} modes={modes} setMode={setMode} />
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
      <section>
        {faqs.map((faq, key) => (
          <div key={key}>
            <h2>{faq.question}</h2>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
          </div>
        ))}
      </section>
    </BasePage>
  );
};

KeyboardPage.whyDidYouRender = true;

interface KeyboardPageParams extends ParsedUrlQuery {
  keyboard: string;
}

export const getStaticProps: GetStaticProps<
  KeyboardPageProps,
  KeyboardPageParams
> = async (context) => {
  const { keyboard } = context.params as KeyboardPageParams;
  const keyboardsDirectory = path.join(process.cwd(), 'keyboards');
  const filePath = path.join('/', keyboardsDirectory, `${keyboard}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  const data: LanguageData = JSON.parse(fileContents);
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
  const keyboardsDirectory = path.join(process.cwd(), 'keyboards');
  const filenames = fs.readdirSync(keyboardsDirectory);
  const paths = filenames.map((filename) => {
    return {
      params: {
        keyboard: path.parse(filename).name,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default KeyboardPage;
