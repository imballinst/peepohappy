import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';

import Navbar from './Navbar';
import '../all.css';
import useSiteMetadata from './SiteMetadata';
import { peepoTheme } from '../theme';

type Props = {
  children: ReactNode;
};

const Content = styled.div`
  height: calc(100vh - ${peepoTheme.topbarHeight}px);
  margin-top: ${peepoTheme.topbarHeight}px;
`;

function TemplateWrapper({ children }: Props) {
  const { title, description } = useSiteMetadata();

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <Content
        className={`${peepoTheme.pageVerticalSpacing} ${peepoTheme.pageHorizontalSpacing}`}
      >
        {children}
      </Content>
    </div>
  );
}

export default TemplateWrapper;
