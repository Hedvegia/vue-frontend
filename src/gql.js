import gql from 'graphql-tag'

export const hello = gql`
  query {
    hello
  }
`

export const ITEMS = gql`
  query {
    getItems {
      id
      title
      where
      when
      notes
      state
    }
  }
`
