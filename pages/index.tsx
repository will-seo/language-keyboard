import Head from 'next/head'
import styles from '../styles/Home.module.css'
import data from '../data/japanese-hiragana.json';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Keyboard from '../components/Keyboard';
import { convert } from '../utils/convert';

export default function Home() {
  const [text, setText] = useState('');

  const title = `${data.name} Language Keyboard`;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLElement).closest('button')?.dataset.to;
    if (value) setText(text + value);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(convert(e.target.value));
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
        <span className={styles.flag}>{data.flag}</span>
        <textarea onChange={onChange} className={styles.input} rows={5} placeholder='Start typing to convert' value={text}></textarea>
        <Keyboard data={data} onClick={onClick} />
      </main>
    </div>
  )
}
