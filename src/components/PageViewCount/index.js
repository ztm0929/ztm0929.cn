import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function PageViewCount() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cn.vercount.one/js';
      script.defer = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        if (window.Vercount) {
          window.Vercount.init();
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isScriptLoaded]);

  return (
    <BrowserOnly>
      {() => (
        <span style={{ fontSize: '0.8em', color: '#888' }}>
          总访问量 <span id="vercount_value_site_pv">Loading</span> 次 | 
          总访客数 <span id="vercount_value_site_uv">Loading</span> 人 |
          当前页面访问量 <span id="vercount_value_page_pv">Loading</span> 次
        </span>
      )}
    </BrowserOnly>
  );
}