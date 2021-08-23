import { gql } from '@apollo/client';

// homepage
export const GET_HOT_CONTESTS = gql`
  query ($after:ID,$existPoster:Boolean,$sort:ContestsSortType, $first:Int, $applicationStatuses:[ContestApplicationStatus!]){
    contests(after:$after,existPoster:$existPoster,sort:$sort,first:$first,applicationStatuses:$applicationStatuses){
      pageInfo{
        hasNextPage
        endCursor
      }
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

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      label
      parentID
    }
  }
`

// search page
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

export const GET_SEARCH_LISTS= gql`
  query GetLists ($first:Int,$after:ID,$categories:[ID!],$search:String,$sort:ContestsSortType,$conditions:[ID!],$types:[ID!]){
    contests(first:$first,after:$after,categories:$categories,search:$search,sort:$sort,conditions:$conditions,types:$types) {
      pageInfo{
        endCursor
        hasNextPage
      }
      totalCount
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

// search map 
export const GET_MAP_LISTS = gql`
  query GetMap ($place:LatLngBoxInput, $types:[ID!], $conditions:[ID!], $categories:[ID!]){
    contests(place:$place, types:$types, conditions:$conditions, categories:$categories){
      edges{
        node{
          id
          title
          hits
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
`

// category list page
export const GET_CATEGORY_LIST_HOTS= gql`
  query GetCategotyList ($first:Int, $after:ID,$categories:[ID!]){
    hotContests : contests(first:$first,after:$after,categories:$categories,sort:HITS) {
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
  query GetCategotyList ($first:Int, $after:ID,$categories:[ID!]){
    latestContests : contests(first:$first,after:$after,categories:$categories,sort:LATEST) {
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


// detail page
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

