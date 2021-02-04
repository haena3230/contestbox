  // 첫번째 메인 탭 MainPage.tsx
import React,{useState,useEffect} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
// Component
import Header from '~/Components/Header';
import {HashTag} from '~/Components/HashTag';
import {SearchBar} from '~/Components/SearchBar';
import Loading from '~/Components/Loading';
// style 
import {Color,Styles,Container,DWidth} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import { useQuery,useMutation } from '@apollo/client';
import {GET_HOTS} from '~/queries';
import {SearchPageProps} from '~/Types';


// test
// import {ADD_CONTEST} from '~/queries';
// function Add(){
//   const[addContest]=useMutation(ADD_CONTEST);
//   return(
//     <TouchableOpacity onPress={()=>{
//       addContest();
//     }}>
//       <Text>test</Text>
//     </TouchableOpacity>
//   )
// }


const SearchPage = ({navigation}:SearchPageProps) => {
  // catrgory data
  const { loading, error, data } = useQuery(GET_HOTS);
  let template=``;
  if(loading) return <Loading />
  if(error){
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(error.networkError.message)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  }
  if(data&&data.categories){
    template=data.categories.map((cate)=>
    <TouchableOpacity  key = {cate.id.toString()} onPress={()=>
        navigation.navigate('CategoryListPage',{
          category:cate.label,
          categoryId:cate.id
        })}>
      <HashTag hashtag={cate.label} picked={false}/>
    </TouchableOpacity>
    )
  }

  // const [test,setTest]=useState<Array<any>>([]);
  // useEffect(()=>{
  //   setTest(testdata);
  // },[])
  return (
      <Container>
        <Header />
        {/* <Add /> */}
        <MainContainer>
          <Title>
            <Text style={Styles.b_font}>어떤 </Text>
            <Point>대회</Point>
            <Text style={Styles.b_font}>를 찾고계신가요?</Text>
          </Title>
          <View style={{alignItems:'center'}}>
            <SearchBar onPress={()=>navigation.navigate('SearchListPage',{
              search:'test'
            })} />
          </View>
          <Category>
            <Title>
              <Text style={Styles.m_font}>카테고리</Text>
            </Title>
            {data&&data.categories?(
                <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:20}}>
                  {template}
                </View>    
              ):
              <View>
                <Text>err</Text>
              </View>
              }
            {/* <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:20}}>
              {
                test.map((data)=>{
                  return(
                    <HashTag key = {data.id.toString()} hashtag={data.label} picked={false}/>
                  )
                })
              }
            </View> */}
          </Category>
        </MainContainer>
      </Container>
  );
};


const MainContainer=styled.View`
  height:100%;
  justify-content:center;
  padding:${DWidth > 480 ? '50px':'20px'};
`
const Title=styled.View`
  width:100%;
  flex-direction:row; 
`

const Point = styled.Text`
  ${Styles.b_font};
  color:${Color.p_color};
`

const Category=styled.View`
  width:100%;
  margin-vertical:20px;
`


export default SearchPage;

const testdata=[
  {
    id:1,
    label:'test',
  },
  {
    id:2,
    label:'test',
  },
  {
    id:3,
    label:'test',
  },
  {
    id:4,
    label:'test',
  },
  {
    id:5,
    label:'test',
  },
  {
    id:6,
    label:'test',
  },

]