import gql from 'graphql-tag'

export const ITEMS = gql`
  query {
    getItems {
      id
      title
      notes
      state
    }
  }
`

export const UPDATE_ITEMS = gql`
  mutation UpdateOne($id: String, $input: ListInput) {
    updateOne(id: $id, input: $input) {
      id
      title
      notes
      state
    }
  }
`

export const CREATE_TODO = gql`
  mutation CreateItem($input: ListInput) {
    createOne(input: $input) {
      id
      title
      notes
      state
    }
  }
`
