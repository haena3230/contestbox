import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      label
    }
  }
`;

export const GET_LISTS= gql`
  query{
    contests {
      edges{
        node{
          id
          title
          hits
          categories{
            id
            label
          }
        }
      }
    }
  }
`;

 export const GET_DETAILS= gql`
    query ($id: UUID){
        contest(id: $id) {
            posterURL
            title
            hits
            categories{
                id
                label
            }
            types{
                id
                label
            }
            applicationPeriodStartAt
            applicationPeriodEndAt
            siteURL
        }
    }
    `;