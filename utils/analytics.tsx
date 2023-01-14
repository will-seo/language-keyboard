import Script from 'next/script';

export const renderAnalytics = (gtagID: string) =>
  gtagID && (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtagID}');
      `}
      </Script>
    </>
  );
