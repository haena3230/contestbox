import { gql } from '@apollo/client';

export const GET_HOTS = gql`
  query ($existPoster:Boolean,$sort:ContestsSortType, $first:Int, $applicationStatuses:[ContestApplicationStatus!]){
    categories {
      id
      label
      parentID
    }
    contests(existPoster:$existPoster,sort:$sort,first:$first,applicationStatuses:$applicationStatuses){
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
  query ($first:Int,$after:ID,$categories:[ID!],$search:String,$sort:ContestsSortType,$conditions:[ID!],$types:[ID!],$place:LatLngBoxInput){
    types{
        id
        label
      }
      conditions{
        id
        label
      }
    contests(first:$first,after:$after,categories:$categories,search:$search,sort:$sort,conditions:$conditions,types:$types,place:$place) {
      pageInfo{
        endCursor
        hasNextPage
      }
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