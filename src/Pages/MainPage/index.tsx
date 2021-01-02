  // 첫번째 메인 탭 MainPage.tsx
import React,{useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
// Component
import Header from '~/Components/Header';
import {HashTag} from '~/Components/HashTag';
import Search from '~/Assets/search-solid.svg';
// style 
import {Color,Styles,Container,IconSize,DWidth} from '~/Styles';
import { TextInput } from 'react-native-gesture-handler';
// data
import { useQuery, gql } from '@apollo/client';
const GET_CATEGORIES = gql`
  query {
    categories {
      id
      label
    }
  }
`;


const MainPage = () => {
  // catrgory data
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  let template=``;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;
  if(data&&data.categories){
    // max 10개
    let max = data.categories.slice(0,10);
    template=max.map((data)=>
      <HashTag key = {data.id.toString()} hashtag={data.label} picked={false}/>
    )
  }
  return (
      <Container>
        <Header />
        <MainContainer>
          <Title>
            <Text style={Styles.b_font}>어떤 </Text>
            <Point>대회</Point>
            <Text style={Styles.b_font}>를 찾고계신가요?</Text>
          </Title>
          <View style={{alignItems:'center'}}>
            <SearchBar />
          </View>
          <Category>
            <Title>
              <Text style={Styles.m_font}>카테고리</Text>
            </Title>
            <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:20}}>
              {template}
            </View>
          </Category>
        </MainContainer>
      </Container>
  );
};

const SearchBar=()=>{
  const[searchText,setSearchText]=useState('');
  return(
    <SearchBarStyle>
      <View style={{paddingHorizontal:15}}>
        <Search height={IconSize.icon} width={IconSize.icon} color={Color.g3_color}/>
      </View>
      <TextInput style={Styles.m_font} placeholder={'2020 인공지능 온라인 경진대회'} value={searchText} onChangeText={(text)=>{setSearchText(text)}} />
    </SearchBarStyle>
  )
}

const MainContainer=styled.View`
  height:100%;
  justify-content:center;
  padding:${DWidth > 480 ? '50px':'20px'};
`
const Title=styled.View`
  width:100%;
  flex-direction:row; 
`
const SearchBarStyle=styled.View`
  width:95%;
  background-color:${Color.w_color};
  border-radius:25px;
  flex-direction:row;
  align-items:center;
  margin-vertical:20px;
  border-width:1px;
  border-color:${Color.g1_color};
`
const Point = styled.Text`
  ${Styles.b_font};
  color:${Color.p_color};
`

const Category=styled.View`
  width:100%;
  margin-vertical:20px;
`


export default MainPage;

