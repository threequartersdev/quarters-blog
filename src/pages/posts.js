import React from "react"
import Hero from "../components/Hero"
import Posts from "../components/Posts"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const PostsPage = ({ data }) => {
  const {
    allContentfulBlog: { nodes: posts },
  } = data

  return (
    <>
      <SEO title="Posts" />
      <Hero />
      <Posts posts={posts} title="All Posts" page />
    </>
  )
}

export const query = graphql`
  {
    allContentfulBlog(sort: { order: DESC, fields: date }) {
      nodes {
        date(formatString: "MMMM Do, YYYY")
        id
        slug
        category
        title
        description
        text {
          text
        }
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default PostsPage
