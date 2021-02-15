import { gql } from '@apollo/client';

export const GET_HOTS = gql`
  query ($sort:ContestsSortType, $edge:EdgeInput, $applicationStatuses:[ContestApplicationStatus!]){
    categories {
      id
      label
      parentID
    }
    contests(sort:$sort,edge:$edge,applicationStatuses:$applicationStatuses){
      edges{
        node{
          id
          hits
          title
          posterURL
        }
      }
    }
  }
`;

export const GET_LISTS= gql`
  query ($categories:[ID!],$search:String,$sort:ContestsSortType,$conditions:[ID!]){
    contests(categories:$categories,search:$search,sort:$sort,conditions:$conditions) {
      edges{
        node{
          id
          title
          hits
          categories{
            id
            label
          }
          application{
            status
            period{
              endAt
            }
          }
        }
      }
    }
  }
`;

 export const GET_DETAILS= gql`
    query ($id:ID!){
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
            application{
              period{
                startAt
                endAt
              }
              status
            }
            siteURL
            place{
              alias
              fullAddress
              latLng{
                lat
                lng
              }
            }
        }
    }
`;

export const GET_FILTER=gql`
    query{
      types{
        id
        label
      }
      conditions{
        id
        label
      }
    }
`