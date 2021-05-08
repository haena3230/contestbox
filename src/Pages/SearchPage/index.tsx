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
import { CategotyDesign, CategotyIT, CategotyMusic, CategotySport, CategotyStudy, CategotyUCC, TypeFirst, TypeSecond, TypeThird } from '~/Components/CategoryBtn';

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
          <Title>
            <Text style={Styles.b_b_font}>어떤 </Text>
            <Point>대회</Point>
            <Text style={Styles.b_b_font}>를 찾고계신가요?</Text>
          </Title>
          <SearchBar navigation={navigation}/>
          <Title>
            인기카테고리
          </Title>
          <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
            <CategotySport />
            <CategotyIT />
            <CategotyStudy />
            <CategotyUCC />
            <CategotyMusic />
            <CategotyDesign />
          </View>
          <Title>
            대회 종류
          </Title>
          <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around'}}>
            <TypeFirst />
            <TypeSecond />
            <TypeThird />
          </View>
      </Container>
  );
};


const Title=styled.Text`
  ${Styles.m_b_font};
  margin:20px 0 15px 0;
`

const Point = styled.Text`
  ${Styles.b_m_font};
  color:${Color.p_color};
`

export default SearchPage;
