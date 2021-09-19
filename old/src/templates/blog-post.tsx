import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Layout, { SectionWrapper } from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Typography } from '../components/Typography';
import { peepoTheme } from '../theme';
import { Paper } from '../components/Paper';
import { ListItem } from '../components/List';
import { PeepoLink } from '../components/Links';
import { stringify } from '../helpers/utils';
import SEO from '../components/SEO';
import { ImageBlurb } from '../common-types';

type BlogPostTemplateProps = {
  content: ReactNode;
  contentComponent?: React.ElementType;
  tags: string[];
  title: string;
  date: string;
  modifiedDate: string;
  helmet?: ReactNode;
};

const DateContent = styled.div`
  margin-bottom: ${peepoTheme.spacing(4)};
`;
const Separator = styled.span`
  margin-left: ${peepoTheme.spacing(2)};
  margin-right: ${peepoTheme.spacing(2)};
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  date,
  modifiedDate,
  helmet
}: BlogPostTemplateProps) => {
  const PostContent = contentComponent || Content;

  return (
    <SectionWrapper>
      <Paper className="flex-col">
        {helmet || ''}
        <Typography variant="h1" className="leading-none">
          {title}
        </Typography>
        <DateContent
          className={`${peepoTheme.textSizes.small} mt-1 mb-8 text-gray-600`}
        >
          <span>{date}</span>
          {date !== modifiedDate && (
            <>
              <Separator>|</Separator>
              <span>Last modified {modifiedDate}</span>
            </>
          )}
        </DateContent>

        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <Typography variant="h4">Tags</Typography>
            <ul className="taglist">
              {tags.map(tag => (
                <ListItem
                  className={`inline ${peepoTheme.textSizes.base}`}
                  key={tag + `tag`}
                >
                  <PeepoLink to={`/blog${stringify({ filterTags: [tag] })}`}>
                    {tag}
                  </PeepoLink>
                </ListItem>
              ))}
            </ul>
          </div>
        ) : null}
      </Paper>
    </SectionWrapper>
  );
};

type BlogPostProps = {
  data: {
    markdownRemark: {
      id: string;
      html: string;
      fields: {
        modifiedDate: string;
      };
      frontmatter: {
        date: string;
        title: string;
        description: string;
        tags: string[];
        featuredimage: ImageBlurb;
      };
    };
  };
};

const BlogPost = ({ data }: BlogPostProps) => {
  const { markdownRemark: post } = data;

  return (
    <Layout noPadding>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            image={post.frontmatter.featuredimage}
          />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        modifiedDate={post.fields.modifiedDate}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        modifiedDate(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        featuredImageResized: featuredimage {
          childImageSharp {
            gatsbyImageData(width: 1200, placeholder: BLURRED)
          }
        }
        tags
      }
    }
  }
`;