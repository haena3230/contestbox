import { gql } from '@apollo/client';

// homepage
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
          title
          posterURL
          application{
            period{
              endAt
            }
            status
          }
        }
      }
    }
  }
`;
export const GET_SEARCH_LISTS= gql`
  query GetLists ($first:Int,$after:ID,$categories:[ID!],$search:String,$sort:ContestsSortType,$conditions:[ID!],$types:[ID!],$place:LatLngBoxInput){
    types{
      id
      label
    }
    conditions{
      id
      label
    }
    contests(first:$first,after:$after,categories:$categories,search:$search,sort:$sort,conditions:$conditions,types:$types) {
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
          posterURL
        }
      }
    }
  }
`;

export const GET_CATEGORY_LIST_HOTS= gql`
  query GetListHot ($cursor:ID,$categories:[ID!]){
    contests(first:10,after:$cursor,categories:$categories,sort:HITS) {
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
          id
          title
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
          posterURL
        }
      }
    }
  }
`;

export const GET_CATEGORY_LIST_LATEST= gql`
  query GetListLatest ($cursor:ID,$categories:[ID!]){
    contests(first:10,after:$cursor,categories:$categories,sort:LATEST) {
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
          id
          title
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
          posterURL
        }
      }
    }
  }
`;

export const GET_CATEGORY_LIST_IMM= gql`
  query GetListImm ($cursor:ID,$categories:[ID!]){
    contests(first:10,after:$cursor,categories:$categories,sort:HITS) {
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
          id
          title
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
          posterURL
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