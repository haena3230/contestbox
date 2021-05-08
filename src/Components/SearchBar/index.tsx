// searchbar
import React,{useState} from 'react';
import {TouchableOpacity,TextInput, View} from 'react-native';
import {Color,IconSize,Styles} from '~/Styles';
import styled from 'styled-components/native';
import {SearchPageProps} from '~/Types';
// component
import Search from '~/Assets/search-solid.svg';
import {InfoModalComponent} from '~/Components/Modal';


export const SearchBar=({navigation}:SearchPageProps)=>{
  const[searchText,setSearchText]=useState<null|string>();
  const[infoModal,setInfoModal]=useState<boolean>(false);
  const onSubmet=()=>{
    if(!searchText){
      setInfoModal(true);
      setTimeout(()=>{
        setInfoModal(false);
      },1500);
    }
    else{
      navigation.navigate('SearchListPage',{
          search:searchText,
          typeArray:null,
          conditionArray:null,
        });
    }
  }
  return(
    <SearchBarStyle>
      <TouchableOpacity onPress={onSubmet} style={{paddingHorizontal:15}}>
        <Search height={IconSize.sicon} width={IconSize.sicon} color={Color.gray}/>
      </TouchableOpacity>
      <View style={{alignItems:'center'}}>
        <TextInput 
          style={Styles.m_font} 
          placeholder={'검색어를 입력해 주세요.'} 
          value={searchText} 
          onChangeText={(text)=>{setSearchText(text)}} 
          onSubmitEditing={onSubmet}
          maxLength={35}
          />
        </View>
        <InfoModalComponent 
          Info={'검색어를 입력해 주세요.'}
          modalVisible={infoModal}
        />
    </SearchBarStyle>
  )
}
const SearchBarStyle=styled.View`
  width:95%;
  background-color:${Color.border};
  border-radius:10px;
  flex-direction:row;
  align-items:center;
  margin-vertical:5px;
  elevation: 3
`

