  // 첫번째 메인 탭 MainPage.tsx
import React from 'react';
import {View, ScrollView,TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
// Component
import {SearchBar} from '~/Components/SearchBar';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import {TypeFirst, TypeSecond, TypeThird,ConditionBtn, HotCategory} from '~/Components/CategoryBtn';
// style 
import {Color,Styles,Container,IconSize,SectionTitle,PointText, Title} from '~/Styles';
// data
import {SearchPageProps} from '~/Types';
import { useQuery } from '@apollo/client';
import { GET_FILTER } from '~/queries';
import Loading from '~/Components/Loading';
import { conditionsVar, typesVar } from '~/global';
import { changeValue, newStateArraySearch } from '~/Components/Filter';
import { useNavigation } from '@react-navigation/core';


const SearchPage = ({navigation}:SearchPageProps) => {
  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
            {/* search */}
            <SectionTitle>
              <Title>어떤 </Title>
              <PointText>대회</PointText>
              <Title>를 찾고계신가요?</Title>
            </SectionTitle>
            <View style={{width:'100%',alignItems:'center', paddingVertical:10}}>
              <SearchBar navigation={navigation}/>
            </View>
            {/* map search */}
            <TouchableOpacity onPress={()=>{
              navigation.navigate('SearchMapPage')
            }} style ={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center', paddingRight:5}}>
              <MapIcon height={IconSize.sicon} width={IconSize.sicon} color={Color.p_color}/>
              <MapSearchText>지도로 찾아보기</MapSearchText>
            </TouchableOpacity>
            {/* hot category */}
            <SectionTitle>
              인기카테고리
            </SectionTitle>
            <HotCategory />
            {/* contest type */}
            <TypeConditionBtn />
        </Container>
      </ScrollView>
  );
};

const TypeConditionBtn = () =>{
  const {loading, data } = useQuery(GET_FILTER)
  let types = ``
  let conditions = ``
  const navigation = useNavigation()
  if(loading) return <Loading />
  if(data){
    types = data.types.map((type)=>{
      if(type.label == "경시전")
        return <TypeFirst key = {type.id} onPress={()=>{
          typesVar(changeValue(newStateArraySearch(data.types),type.id))
          navigation.navigate('SearchListPage',{
            search:null
          })
        }}/>
      else if(type.label == "경진전")
        return <TypeSecond key = {type.id} onPress={()=>{
          typesVar(changeValue(newStateArraySearch(data.types),type.id))
          navigation.navigate('SearchListPage',{
            search:null
          })
        }}/>
      else if(type.label == "공모전")
        return <TypeThird key = {type.id} onPress={()=>{
          typesVar(changeValue(newStateArraySearch(data.types),type.id))
          navigation.navigate('SearchListPage',{
            search:null
          })
        }}/>
    }),
    conditions = data.conditions.map((condition)=>{
      return(<ConditionBtn key = {condition.id} text = {condition.label} onPress={()=>{
          conditionsVar(changeValue(newStateArraySearch(data.conditions),condition.id))
          navigation.navigate('SearchListPage',{
            search:null
          })
        }}/>)
    })
    typesVar(newStateArraySearch(data.types))
    conditionsVar(newStateArraySearch(data.conditions))
  }
  return(
    <View>
      <SectionTitle>
        대회 종류
      </SectionTitle>
      <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around'}}>
        {types}
      </View>
      {/* contest condition */}
      <SectionTitle>
        참여 조건
      </SectionTitle>
      <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around', paddingBottom:20}}>
        {conditions}
      </View>
    </View>
  )
}



const MapSearchText =styled.Text`
  ${Styles.s_m_font}
  color:${Color.p_color}
  padding-horizontal:8px;
`

export default SearchPage;
