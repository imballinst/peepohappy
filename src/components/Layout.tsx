import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

import Navbar from './Navbar';
import '../all.css';
import { peepoTheme } from '../theme';
import SEO from './SEO';

// Wrapper for bottom padding. When it is scrollable, the bottom-padding will not be visible.
export const SectionWrapper = styled.section`
  & > :last-child {
    margin-bottom: ${peepoTheme.spacing(8)};
  }

  @media (min-width: ${peepoTheme.maxOptimalWidth}) {
    margin-bottom: ${peepoTheme.spacing(12)};
  }
`;

// Layout.
type Props = {
  children: ReactNode;
};

const Content = styled.div`
  height: calc(100vh - ${peepoTheme.topbarHeight}px - 2rem);
  margin-top: ${peepoTheme.topbarHeight}px;

  & > * {
    width: ${peepoTheme.maxOptimalWidth};
  }

  @media (min-width: ${peepoTheme.maxOptimalWidth}) {
    height: calc(100vh - ${peepoTheme.topbarHeight}px - 3rem);
  }
`;

function TemplateWrapper({ children }: Props) {
  return (
    <div>
      <SEO />
      <Navbar />
      <Content
        className={`${peepoTheme.pageVerticalSpacing} ${peepoTheme.pageHorizontalSpacing} flex flex-row justify-center`}
      >
        {children}
      </Content>
    </div>
  );
}

export default TemplateWrapper;
