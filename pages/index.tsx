import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { LanguageData } from '../types';
import Head from 'next/head'
import Keyboard from '../components/Keyboard';
import rawLanguageData from '../data/japanese-hiragana.json';
import styles from '../styles/Home.module.css'
import trie from 'trie-prefix-tree';

const languageData: LanguageData = rawLanguageData;

export default function Home() {
  const [text, setText] = useState('');
  const [dictionary, setDictionary] = useState<ReturnType<typeof trie>>();
  const [allowedCharacters, setAllowedCharacters] = useState<string[]>([]);

  useEffect(() => {
    const words = Object.keys(languageData.characters).sort();
    setDictionary(trie(words));
    setAllowedCharacters(Array.from(new Set(words.join(''))).sort());
  }, []);

  const title = `${languageData.name} Language Keyboard`;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLElement).closest('button')?.dataset.to;
    if (value) setText(text + value);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    let output = '';
    let buffer = '';
    let previous = '';

    input.split('').forEach((character, index) => {
      const allowed = allowedCharacters.includes(character);
      const words = allowed ? dictionary?.getPrefix(buffer + character) || [] : [];

      if (words.length === 1 && dictionary?.hasWord(buffer + character)) {
        output += languageData.characters[buffer + character].to;
        buffer = '';
        previous = '';
      } else if (words.length && dictionary?.hasWord(words[0])) {
        buffer += character;
        previous = words[0];
      } else if (words.length === 0 && previous.length) {
        output += languageData.characters[previous].to;
        buffer = character;
        previous = '';
      } else if (allowed) buffer += character;
      else output += character;

      if (index === input.length - 1) output += buffer;
    });

    setText(output);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>{title}</h1>
        <span className={styles.flag}>{languageData.flag}</span>
        <textarea onChange={onChange} className={styles.input} rows={5} placeholder='Start typing to convert' value={text}></textarea>
        <Keyboard languageData={languageData} onClick={onClick} />
      </main>
    </div>
  )
}
