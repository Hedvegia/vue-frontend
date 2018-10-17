import gql from 'graphql-tag'

export const hello = gql`
  query {
    hello
  }
`

export const ITEMS = gql`
  query {
    getItems {
      title
      where
      when
      to
      notes
    }
  }
`
