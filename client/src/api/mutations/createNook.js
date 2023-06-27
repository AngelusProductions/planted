import { gql } from 'apollo-boost';

export default gql`
  mutation($nook: CreateNookInput!) {
    createNook(input: $nook) {
      nook {
        id
        luxLevel
        photoUrl
        user {
          id
        }
        plants {
          id
          plantType {
            id
            name
          }
        }
      }
    }
  }
`;
