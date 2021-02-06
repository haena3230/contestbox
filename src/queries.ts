import { gql } from '@apollo/client';

export const GET_HOTS = gql`
  query ($sort:ContestsSortType, $edge:EdgeInput, $applicationStatuses:[ContestApplicationStatus!]){
    categories {
      id
      label
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
  query ($categories:[ID!],$search:String,$sort:ContestsSortType){
    contests(categories:$categories,search:$search,sort:$sort) {
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

export const ADD_CATEGORY=gql`
    mutation ($label:String!){
      addCategory(
        category:{
          label:$label
        }
      )
    }
`

export const ADD_CONTEST=gql`
    mutation{
      addContest(
        contest:{
          title:"20/21어쩌구저쩌구대회"
          content:"test"
          siteURL:"https://www.naver.com/"
          posterURL:""
          application:{
            types:[]
            period:{
              startAt:"2020-12-12T12:12:12.933Z"
              endAt:"2020-12-12T12:12:12.933Z"
            }
          }
          categoriesID:["5ff71d24d897dcf49985befb","6005ca896816d395485299a1"]
          auspicersID:[]
          typesID:[]
          managersID:[]
          sponsorsID:[]
          swaggersID:[]
          conditionsID:[]
        }
      )
    }
`