  // 첫번째 메인 탭 MainPage.tsx
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components/native';
// Component
import {HashTag} from '~/Components/HashTag';
import {SearchBar} from '~/Components/SearchBar';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';

// style 
import {Color,Styles,Container,IconSize} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import {SearchPageProps} from '~/Types';
import {newStateArray,CategoryView} from '~/Components/Filter';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES} from '~/queries';
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';
import { CategotyDesign, CategotyIT, CategotyMusic, CategotySport, CategotyStudy, CategotyUCC, 
    TypeFirst, TypeSecond, TypeThird,ConditionBtn} from '~/Components/CategoryBtn';

const SearchPage = ({navigation}:SearchPageProps) => {
  // catrgory data
  // const {loading,error,data,refetch} =useQuery(GET_CATEGORIES,{
  //   fetchPolicy:'cache-and-network'
  // })
  // let cateData=[];
  // if(loading) return <Loading />
  // if(error) return <ErrorPage onPress={async ()=>{
  //       try{
  //           await refetch()
  //           console.log('refetch')
  //       } catch(e){
  //           console.log('refetch err')
  //       }}} />
  // if(data.categories){
  //   cateData=CategoryView(data.categories).slice(0,9).map((cate)=>
  //     <TouchableOpacity  key = {cate[0].id} onPress={()=>{
  //         navigation.navigate('CategoryListPage',{
  //           categoryArray:newStateArray(cate),
  //           typeArray:null,
  //           conditionArray:null,
  //         })
  //     }}
  //     style={{paddingVertical:5}}
  //     >
  //       <HashTag hashtag={cate[0].label} picked={false}/>
  //     </TouchableOpacity>
  //   )
  // }
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
            {/* map searcg */}
            <TouchableOpacity onPress={()=>null} style ={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center', paddingRight:5}}>
              <MapIcon height={IconSize.sicon} width={IconSize.sicon} color={Color.p_color}/>
              <MapSearchText>지도로 찾아보기</MapSearchText>
            </TouchableOpacity>
            {/* hot category */}
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
  margin:20px 0 15px 0;
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
