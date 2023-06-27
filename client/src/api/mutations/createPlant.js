import { gql } from 'apollo-boost';

export default gql`
  mutation($plant: CreatePlantInput!) {
    createPlant(input: $plant) {
      plant {
        id
        nook {
          id
          user {
            id
          }
        }
        plantType {
          id
          name
        }
      }
    }
  }
`;
