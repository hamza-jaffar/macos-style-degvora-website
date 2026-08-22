import Script from "next/script";

export default function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  
  if (!publisherId) return null;

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}
