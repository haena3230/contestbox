  // 첫번째 메인 탭 MainPage.tsx
import React,{useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
// Component
import Header from '~/Components/Header';
import {HashTag} from '~/Components/HashTag';
import Search from '~/Assets/Search.svg';
// style 
import {Color,Styles} from '~/Styles';
import { TextInput } from 'react-native-gesture-handler';




const MainPage = () => {
  
  return (
    <View>
      <Header />
      <Container>
        <Title>
          <Text style={Styles.b_font}>어떤 </Text>
          <Point>대회</Point>
          <Text style={Styles.b_font}>를 찾고계신가요?</Text>
        </Title>
        <SearchBar />
        <Category>
          <Title>
            <Text style={Styles.m_font}>카테고리</Text>
          </Title>
          <View style={{height:'40%', flexDirection:'row', flexWrap:'wrap'}}>
            <HashTag hashtag={'낑깡낑깡'} />
            <HashTag hashtag={'test'} />
            <HashTag hashtag={'gg'} />
            <HashTag hashtag={'졸림'} />
            <HashTag hashtag={'룰루'} />
            <HashTag hashtag={'소프트웨어'} />
          </View>
        </Category>
        
      </Container>
    </View>
  );
};

const SearchBar=()=>{
  const[searchText,setSearchText]=useState('');
  return(
    <View style={{width:'90%', backgroundColor:Color.w_color,borderRadius:25, flexDirection:'row',alignItems:'center',marginBottom:30}}>
      <View style={{paddingHorizontal:20}}>
        <Search height={20} width={20} color={Color.g_color}/>
      </View>
      <TextInput placeholder={'2020 인공지능 온라인 경진대회'} value={searchText} onChangeText={(text)=>{setSearchText(text)}} />
    </View>
  )
}

export const Container=styled.View`
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  padding:20px;
`
const Title=styled.View`
  width:100%;
  flex-direction:row; 
  padding-bottom:20px;
`
const Point = styled.Text`
  ${Styles.b_font};
  color:${Color.p_color};
`

const Category=styled.View`
  width:100%;
`


export default MainPage;

