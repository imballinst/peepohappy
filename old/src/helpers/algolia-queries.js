const escapeStringRegexp = require('escape-string-regexp');

const pagePath = 'src/pages';
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          description
          visibility
          tags
        }
        fields {
          slug
        }
        excerpt(pruneLength: 200)
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  const { visibility: _visibility, ...restFrontmatter } = frontmatter;

  return {
    objectID: id,
    ...restFrontmatter,
    ...fields,
    ...rest
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.pages.edges.reduce((array, edge) => {
        // Filter articles with `unlisted` visibility, so they're not searchable in the Gatsby site.
        if (edge.node.frontmatter.visibility === 'unlisted') {
          return array;
        }

        return array.concat(pageToAlgoliaRecord(edge));
      }, []),
    indexName,
    settings: { attributesToSnippet: ['excerpt:20'] }
  }
];

module.exports = queries;