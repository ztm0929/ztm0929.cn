import React from 'react';
import Footer from '@theme-original/Footer';
import PageViewCount from '@site/src/components/PageViewCount';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <div style={{ 
        backgroundColor: 'var(--ifm-footer-background-color)',
        padding: '0.5rem 0',
        marginTop: '-1rem'
      }}>
        <div className="container container-fluid">
          <div className="text--center">
            <PageViewCount />
          </div>
        </div>
      </div>
    </>
  );
}