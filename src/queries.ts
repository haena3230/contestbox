import { gql } from '@apollo/client';

export const GET_HOTS = gql`
  query ($sort:ContestsSortType, $first:Int, $applicationStatuses:[ContestApplicationStatus!]){
    categories {
      id
      label
      parentID
    }
    contests(sort:$sort,first:$first,applicationStatuses:$applicationStatuses){
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
  query ($categories:[ID!],$search:String,$sort:ContestsSortType,$conditions:[ID!],$types:[ID!],$place:LatLngBoxInput){
    types{
        id
        label
      }
      conditions{
        id
        label
      }
    contests(categories:$categories,search:$search,sort:$sort,conditions:$conditions,types:$types,place:$place) {
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
            content
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