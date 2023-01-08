import fs from 'fs';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { useRef, useState } from 'react';
import Keyboard from '../components/Keyboard';
import baseStyles from '../styles/Base.module.css';
import { LanguageData, LanguageLayoutData } from '../types';
import { checkBuffer } from '../utils/checkBuffer';

interface KeyboardProps {
  language: string;
  dictionary: { [key: string]: string };
  allowed: string[];
  bufferMax: number;
  layout: LanguageLayoutData[];
  columns: number;
  rows: number;
}

const KeyboardPage: NextPage<KeyboardProps> = (props) => {
  const { language, dictionary, allowed, bufferMax, layout, columns, rows } =
    props;
  const [text, setText] = useState('');

  const title = `${language} Language Keyboard`;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.altKey || e.ctrlKey || e.metaKey;
    if (modifier || !allowed.includes(e.key.toLowerCase())) return;

    const target = e.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const buffer =
      target.value.slice(
        Math.max(selectionStart - bufferMax, 0),
        selectionStart,
      ) + e.key;
    const keys = Object.keys(dictionary);
    const replaceCharacters = checkBuffer(keys, buffer, allowed);
    if (!replaceCharacters) return;

    const replaceWith = dictionary[replaceCharacters];
    const replaceStart = selectionStart - replaceCharacters.length + 1;
    target.setRangeText(replaceWith, replaceStart, selectionEnd, 'end');
    e.preventDefault();
    e.stopPropagation();
  };

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
    <div className={baseStyles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={baseStyles.main}>
        <h1 className={baseStyles.title}>{title}</h1>
        <textarea
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={textAreaRef}
          rows={5}
          placeholder={`Start typing to convert to ${language}`}
        ></textarea>
        <Keyboard
          layout={layout}
          rows={rows}
          columns={columns}
          onClick={onClick}
        />
      </main>
    </div>
  );
};

KeyboardPage.whyDidYouRender = true;

interface KeyboardParams extends ParsedUrlQuery {
  keyboard: string;
}

export const getStaticProps: GetStaticProps<
  KeyboardProps,
  KeyboardParams
> = async (context) => {
  const { keyboard } = context.params as KeyboardParams;
  const keyboardsDirectory = path.join(process.cwd(), 'keyboards');
  const filePath = path.join('/', keyboardsDirectory, `${keyboard}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data: LanguageData = JSON.parse(fileContents);
  const { language, dictionary, layout } = data;

  const words = Object.keys(dictionary);
  const allowed = Array.from(new Set(words.join(''))).sort();
  const bufferMax = Math.max(...words.map((word) => word.length - 1), 0);
  const columns = Math.max(...layout.map((key) => key.x + 1), 0);
  const rows = Math.max(...layout.map((key) => key.y + 1), 0);

  return {
    props: {
      language,
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
