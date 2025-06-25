import { useEffect } from 'react';
import styles from '../styles/AdSlot.module.css';

declare global {
  interface Window {
    adsbygoogle: object[];
  }
}

const AdSlot = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      <div className={styles.adslot}>
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-1638826924479453"
          data-ad-slot="5751104211"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default AdSlot;
