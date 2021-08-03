  // 첫번째 메인 탭 MainPage.tsx
import React, { useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components/native';
// Component
import {SearchBar} from '~/Components/SearchBar';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import { CategoryDesign, CategoryIT, CategoryMusic, CategorySport, CategoryStudy, CategoryUCC, 
    TypeFirst, TypeSecond, TypeThird,ConditionBtn} from '~/Components/CategoryBtn';
// style 
import {Color,Styles,Container,IconSize,SectionTitle,PointText, Title} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import {SearchPageProps} from '~/Types';
import { treeCategoriesVar } from '~/global';
import { newStateArray, newStateArrayHot } from '~/Components/Filter';


const SearchPage = ({navigation}:SearchPageProps) => {
  const treeCategories = treeCategoriesVar()
  return (
      <ScrollView>
        <Container>
            {/* search */}
            <SectionTitle>
              <Title>어떤 </Title>
              <PointText>대회</PointText>
              <Title>를 찾고계신가요?</Title>
            </SectionTitle>
            <View style={{width:'100%',alignItems:'center'}}>
              <SearchBar navigation={navigation}/>
            </View>
            {/* map search */}
            <TouchableOpacity onPress={()=>null} style ={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center', paddingRight:5}}>
              <MapIcon height={IconSize.sicon} width={IconSize.sicon} color={Color.p_color}/>
              <MapSearchText>지도로 찾아보기</MapSearchText>
            </TouchableOpacity>
            {/* hot category */}
            <SectionTitle>
              인기카테고리
            </SectionTitle>
            <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
              {treeCategories.map((group)=>{
              if(group[0].label=="스포츠") return(
                  <CategorySport key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="IT") return(
                  <CategoryIT key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="학습") return(
                  <CategoryStudy key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="UCC") return(
                  <CategoryUCC key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="음악") return(
                  <CategoryMusic key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="미술")return(
                  <CategoryDesign key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              })}
              
            </View>
            {/* contest type */}
            <SectionTitle>
              대회 종류
            </SectionTitle>
            <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around'}}>
              <TypeFirst />
              <TypeSecond />
              <TypeThird />
            </View>
            {/* contest condition */}
            <SectionTitle>
              참여 조건
            </SectionTitle>
            <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around', paddingBottom:20}}>
              <ConditionBtn text={'13세 미만'} />
              <ConditionBtn text={'중고등학생'} />
              <ConditionBtn text={'대학생'} />
              <ConditionBtn text={'성인'} />
            </View>
        </Container>
      </ScrollView>
  );
};



const MapSearchText =styled.Text`
  ${Styles.s_m_font}
  color:${Color.p_color}
  padding-horizontal:8px;
`

export default SearchPage;
