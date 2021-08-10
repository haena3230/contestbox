// searchbar
import React,{useState} from 'react';
import {TouchableOpacity,TextInput, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Color,DWidth,IconSize,Styles} from '~/Styles';
import styled from 'styled-components/native';
import {CommunityPageProps, SearchPageProps} from '~/Types';
// component
import Search from '~/Assets/search-solid.svg';
import {InfoModalComponent} from '~/Components/Modal';
import Arrow from '~/Assets/chevron-left-solid.svg';


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
          search:searchText
        });
    }
  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  )
}
// search list page search bar
export const SearchBarSmall=({navigation}:SearchPageProps)=>{
    const[infoModal,setInfoModal]=useState<boolean>(false);
    const[searchText,setSearchText]=useState<string|null>();
    const onSubmet=()=>{
        if(!searchText){
            setInfoModal(true);
            setTimeout(()=>{
                setInfoModal(false);
            },1500);
        }
        else{
        navigation.push('SearchListPage',{
            search:searchText
            });
        }
    }
    return(
        <SearchHeader>
          <View style={{width:'5%'}}>
            <Arrow onPress={()=>navigation.goBack()} height={IconSize.sicon} width={IconSize.sicon} color={Color.gray}/>
          </View>
          <SmallSearchBarStyle>
              <TouchableOpacity onPress={onSubmet} style={{paddingHorizontal:15}}>
                  <Search height={IconSize.sicon} width={IconSize.sicon} color={Color.gray}/>
              </TouchableOpacity>
              <TextInput
                  style={Styles.m_font}
                  placeholder={'검색어를 입력해 주세요'} 
                  value={searchText} 
                  onChangeText={(text)=>{setSearchText(text)}} 
                  maxLength={35}
                  onSubmitEditing={onSubmet}
                  />
          </SmallSearchBarStyle>
          <InfoModalComponent 
              Info={'검색어를 입력해 주세요'}
              modalVisible={infoModal}
              />
        </SearchHeader>
    )
}
// community searchbar
export const CMSearchBar=({navigation}:CommunityPageProps)=>{
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
      // navigation.navigate('SearchListPage',{
      //     search:searchText,
      //     typeArray:null,
      //     conditionArray:null,
      //   });
    }
  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  )
}
const SearchBarStyle=styled.View`
  width:95%;
  background-color:${Color.border};
  border-radius:10px;
  flex-direction:row;
  align-items:center;
  elevation: 3
`

// search bar
const SearchHeader=styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
`
const SmallSearchBarStyle=styled.View`
  width:90%;
  height:${DWidth > 480 ? 60 : 40}px;
  background-color:${Color.w_color};
  border-radius:20px;
  flex-direction:row;
  align-items:center;
  margin-vertical:10px;
  margin-left:10px;
  border-width:1px;
  border-color:${Color.border};
`

