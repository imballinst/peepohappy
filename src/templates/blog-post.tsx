import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout, { SectionWrapper } from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Typography } from '../components/Typography';
import { peepoTheme } from '../theme';
import { Paper } from '../components/Paper';
import { ListItem } from '../components/List';
import { PeepoLink } from '../components/Links';
import { stringify } from '../helpers/utils';

type BlogPostTemplateProps = {
  content: ReactNode;
  contentComponent?: React.ElementType;
  tags: string[];
  title: string;
  date: string;
  helmet?: ReactNode;
};

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  date,
  helmet
}: BlogPostTemplateProps) => {
  const PostContent = contentComponent || Content;

  return (
    <SectionWrapper>
      <Paper>
        {helmet || ''}
        <Typography variant="h1" className="leading-none">
          {title}
        </Typography>
        <span
          className={`${peepoTheme.textSizes.small} mt-1 mb-8 text-gray-600`}
        >
          {date}
        </span>

        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <Typography variant="h4">Tags</Typography>
            <ul className="taglist">
              {tags.map(tag => (
                <ListItem
                  className={`inline ${peepoTheme.textSizes.small}`}
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
      frontmatter: {
        date: string;
        title: string;
        description: string;
        tags: string[];
      };
    };
  };
};

const BlogPost = ({ data }: BlogPostProps) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={post.frontmatter.description} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
