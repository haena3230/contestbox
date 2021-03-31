// searchbar
import React,{useState} from 'react';
import {TouchableOpacity,TextInput} from 'react-native';
import {Color,IconSize,Styles} from '~/Styles';
import styled from 'styled-components/native';
import {SearchPageProps} from '~/Types';
// icon
import Search from '~/Assets/search-solid.svg';


export const SearchBar=({navigation}:SearchPageProps)=>{
  const[searchText,setSearchText]=useState('');
  return(
    <SearchBarStyle>
      <TouchableOpacity onPress={()=>{
        navigation.push('SearchListPage',{
          search:searchText,
          typeArray:null,
          conditionArray:null,
        });
      }} style={{paddingHorizontal:15}}>
        <Search height={IconSize.icon} width={IconSize.icon} color={Color.g3_color}/>
      </TouchableOpacity>
      <TextInput 
        style={Styles.m_font} 
        placeholder={'검색어를 입력해 주세요.'} 
        value={searchText} 
        onChangeText={(text)=>{setSearchText(text)}} 
        
        />
    </SearchBarStyle>
  )
}
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

