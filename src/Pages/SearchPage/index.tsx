  // 첫번째 메인 탭 MainPage.tsx
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components/native';
// Component
import {SearchBar} from '~/Components/SearchBar';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import { CategoryDesign, CategoryIT, CategoryMusic, CategorySport, CategoryStudy, CategoryUCC, 
    TypeFirst, TypeSecond, TypeThird,ConditionBtn} from '~/Components/CategoryBtn';
// style 
import {Color,Styles,Container,IconSize} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import {SearchPageProps} from '~/Types';
import { treeCategoriesVar } from '~/global';
import { newStateArray } from '~/Components/Filter';


const SearchPage = ({navigation}:SearchPageProps) => {
  const treeCategories = treeCategoriesVar()
  return (
      <ScrollView>
        <Container>
            {/* search */}
            <Title>
              <Text style={Styles.mb_b_font}>어떤 </Text>
              <Point>대회</Point>
              <Text style={Styles.mb_b_font}>를 찾고계신가요?</Text>
            </Title>
            <View style={{width:'100%',alignItems:'center'}}>
              <SearchBar navigation={navigation}/>
            </View>
            {/* map search */}
            <TouchableOpacity onPress={()=>null} style ={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center', paddingRight:5}}>
              <MapIcon height={IconSize.sicon} width={IconSize.sicon} color={Color.p_color}/>
              <MapSearchText>지도로 찾아보기</MapSearchText>
            </TouchableOpacity>
            {/* hot category */}
            <Title>
              인기카테고리
            </Title>
            <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
              {treeCategories.map((group)=>{
              if(group[0].label=="스포츠")
                  <CategorySport key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
              else if(group[0].label=="IT")
                  <CategoryIT key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
              else if(group[0].label=="학습")
                  <CategoryStudy key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
              else if(group[0].label=="UCC")
                  <CategoryUCC key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
              else if(group[0].label=="음악")
                return(
                  <CategoryMusic key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
                )
              else if(group[0].label=="미술")
                  <CategoryDesign key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArray(group),
                    categoryIdArr:[group[0].id]
                  })}/>
              })}
            </View>
            {/* contest type */}
            <Title>
              대회 종류
            </Title>
            <View  style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-around'}}>
              <TypeFirst />
              <TypeSecond />
              <TypeThird />
            </View>
            {/* contest condition */}
            <Title>
              참여 조건
            </Title>
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


const Title=styled.Text`
  ${Styles.m_b_font};
  margin:15px 0 15px 0;
`

const Point = styled.Text`
  ${Styles.mb_b_font};
  color:${Color.p_color};
`

const MapSearchText =styled.Text`
  ${Styles.s_m_font}
  color:${Color.p_color}
  padding-horizontal:8px;
`

export default SearchPage;
