  // 첫번째 메인 탭 MainPage.tsx
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
// Component
import Header from '~/Components/Header';
import {HashTag} from '~/Components/HashTag';
import {SearchBar} from '~/Components/SearchBar';

// style 
import {Color,Styles,Container,DWidth} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import {SearchPageProps} from '~/Types';
import {newStateArray,CategoryView} from '~/Components/Filter';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES} from '~/queries';
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';

const SearchPage = ({navigation}:SearchPageProps) => {
  // catrgory data
  const {loading,error,data,refetch} =useQuery(GET_CATEGORIES,{
    fetchPolicy:'cache-and-network'
  })
  let cateData=[];
  if(loading) return <Loading />
  if(error) return <ErrorPage onPress={async ()=>{
        try{
            await refetch()
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }}} />
  if(data.categories){
    cateData=CategoryView(data.categories).slice(0,9).map((cate)=>
      <TouchableOpacity  key = {cate[0].id} onPress={()=>{
          navigation.navigate('CategoryListPage',{
            categoryArray:newStateArray(cate),
            typeArray:null,
            conditionArray:null,
          })
      }}
      style={{paddingVertical:5}}
      >
        <HashTag hashtag={cate[0].label} picked={false}/>
      </TouchableOpacity>
    )
  }
  return (
      <Container>
        <Header />
        <MainContainer>
          <Title>
            <Text style={Styles.b_b_font}>어떤 </Text>
            <Point>대회</Point>
            <Text style={Styles.b_b_font}>를 찾고계신가요?</Text>
          </Title>
          <SearchBar navigation={navigation}/>
          <Category>
            <Title>
              <Text style={Styles.m_m_font}>카테고리</Text>
            </Title>
                <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:20}}>
                  {cateData}              
                </View>
          </Category>
        </MainContainer>
      </Container>
  );
};


const MainContainer=styled.View`
  height:100%;
  justify-content:center;
  padding:${DWidth > 480 ? '50px':'10px'};
`
const Title=styled.View`
  width:100%;
  flex-direction:row; 
`

const Point = styled.Text`
  ${Styles.b_m_font};
  color:${Color.p_color};
`

const Category=styled.View`
  width:100%;
  margin-vertical:20px;
`


export default SearchPage;
