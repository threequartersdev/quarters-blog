import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import TitleB from "./TitleB"

const query = graphql`
  {
    allContentfulBlog(sort: { fields: date, order: DESC }) {
      nodes {
        title
        id
        slug
        date(formatString: "MMMM Do, YYYY")
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

const Recent = () => {
  const data = useStaticQuery(query)
  const {
    allContentfulBlog: { nodes: posts },
  } = data

  return (
    <Wrapper>
      <TitleB title="recent" />
      {posts.map(post => {
        const {
          date,
          id,
          title,
          slug,
          image: { fluid },
        } = post

        return (
          <Link to={`/posts/${slug}`} key={id} className="post">
            <Image fluid={fluid} className="img" />
            <div>
              <h5>{title}</h5>
              <p>{date}</p>
            </div>
          </Link>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .post {
    display: grid;
    grid-template-columns: 75px 1fr;
    column-gap: 1rem;
    margin-bottom: 1rem;
  }
  .img {
    border-radius: var(--radius);
  }
  h5 {
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
    letter-spacing: 0;
    line-height: 1.2;
    color: var(--clr-grey-1);
  }
  p {
    font-size: 0.6rem;
    margin-bottom: 0;
    color: var(--clr-grey-5);
  }
  .post:hover {
    h5 {
      color: var(--clr-primary-5);
    }
  }
`

export default Recent
