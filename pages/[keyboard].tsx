import fs from 'fs';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { useRef, useState } from 'react';
import BasePage from '../components/Base';
import Keyboard from '../components/Keyboard';
import TextArea from '../components/TextArea';
import { LanguageData } from '../types';

interface KeyboardPageProps extends LanguageData {
  allowed: string[];
  bufferMax: number;
  columns: number;
  rows: number;
}

const KeyboardPage: NextPage<KeyboardPageProps> = (props) => {
  const {
    language,
    metaDescription,
    dictionary,
    allowed,
    bufferMax,
    layout,
    columns,
    rows,
  } = props;
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const title = `${language} Language Keyboard`;

  const onClick = (insertText: string) => {
    if (!textAreaRef.current || !insertText) return;
    const { selectionStart, selectionEnd } = textAreaRef.current;
    textAreaRef.current.focus();
    textAreaRef.current.setRangeText(
      insertText,
      selectionStart,
      selectionEnd,
      'end',
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <BasePage title={title} metaDescription={metaDescription}>
      <TextArea
        text={text}
        language={language}
        dictionary={dictionary}
        allowed={allowed}
        bufferMax={bufferMax}
        textAreaRef={textAreaRef}
        onChange={onChange}
      />
      <Keyboard
        layout={layout}
        rows={rows}
        columns={columns}
        onClick={onClick}
      />
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
  const { language, metaDescription, faqs, dictionary, layout } = data;

  const words = Object.keys(dictionary);
  const allowed = Array.from(new Set(words.join(''))).sort();
  const bufferMax = Math.max(...words.map((word) => word.length - 1), 0);
  const columns = Math.max(...layout.map((key) => key.x + 1), 0);
  const rows = Math.max(...layout.map((key) => key.y + 1), 0);

  return {
    props: {
      language,
      metaDescription,
      faqs,
      dictionary,
      allowed,
      bufferMax,
      layout,
      columns,
      rows,
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
