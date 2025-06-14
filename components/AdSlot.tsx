import Script from 'next/script';
import styles from '../styles/AdSlot.module.css';

const AdSlot = () => {
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
      <Script
        id="ad-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </>
  );
};

export default AdSlot;
