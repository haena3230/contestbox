// main home page
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
// component
import Header from '~/Components/Header';
import {Container,Styles,Color} from '~/Styles';
import Swiper from 'react-native-swiper';
import {HashTag} from '~/Components/HashTag';
import Loading from '~/Components/Loading';
// data
import {useQuery} from '@apollo/client';
import {GET_HOTS} from '~/queries';
import {HomaPageProps} from '~/Types';
import {useDispatch} from 'react-redux'
import { categoryAction,firstCategoryAction } from '~/Store/actions';

// category treeview 저장
const categoryView=(array:Array<{id,label,parentID}>)=>{
  let i=0;
  let categories = new Array();
  while(array[i]!==undefined){
    let tmp = new Array();
    let j=0;
    if(array[i].parentID===null){
      tmp.push(array[i]);
      while(array[j]!==undefined){
        if(array[i].id===array[j].parentID){
          tmp.push(array[j]);
        } j++;
      }
      categories.push(tmp);
    }
    i++
  }
  return categories;
}

// 1차 categories
const firstCategories=(array)=>{
  let categories=new Array();
  let i=0;
  while(array[i]!==undefined){
    categories.push(array[i][0])
    i++;
  }
  return categories; 
}

const HomePage = ({navigation}:HomaPageProps) => {
  // redux
  const dispatch = useDispatch()
  const storeCategories=(Array:Array<string>)=>{
    dispatch(categoryAction(Array))
  }
   const storeFirstCategories=(Array:Array<string>)=>{
    dispatch(firstCategoryAction(Array))
  }
  // catrgory && hot data
  const { loading, error, data } = useQuery(GET_HOTS,{
    variables:{sort:'HITS',edge:{
      first:10
    },applicationStatuses:['NOTSTARTED','INPROGRESS']}
  });
  let categoriesData=[];
  let hotData='';
  if(loading) return <Loading />
  if(error)return <Text>err</Text>
  if(data.categories){
    // max 10개
    categoriesData=firstCategories(categoryView(data.categories)).slice(0,9).map((cate)=>
    <TouchableOpacity  key = {cate.id.toString()} onPress={()=>
        navigation.navigate('CategoryListPage',{
          category:cate.label,
          categoryId:cate.id
        })}>
      <HashTag hashtag={cate.label} picked={false}/>
    </TouchableOpacity>
    ),
    storeCategories(categoryView(data.categories));
    storeFirstCategories(firstCategories(categoryView(data.categories)));
  }
  if(data.contests){
    hotData=data.contests.edges.map((contest)=>
    <PosterContainer key = {contest.node.id.toString()} onPress={()=>
      navigation.navigate('DetailPage',{
        listId:contest.node.id
      })
    }>
      <PosterBox>
        <Poster source={{uri:contest.node.posterURL}}/>
      </PosterBox>
      <PosterText numberOfLines={2} ellipsizeMode="tail">{contest.node.title}</PosterText>
    </PosterContainer>
    )
  }
  return (
    <Container>
      <Header />
      <BannerBox>
        <Banner />
      </BannerBox>
      <CategoryContainer>
        <Title>
          카테고리
        </Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingVertical:10}}>
          {categoriesData}
        </ScrollView>
      </CategoryContainer>
      <View style={{padding:10,height:'50%'}}>
        <Title>
          인기대회
        </Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {hotData}
        </ScrollView>
      </View>
    </Container>
  );
};

const Banner = ()=>{
  const renderPagination = (index, total)=> {
    return (
      <BannerPagination>
        <BannerText>{index+1}/{total}</BannerText>
      </BannerPagination>
    )
}
  return(
    <Swiper style={{height:80}} autoplay={true} renderPagination={renderPagination}>
        <TouchableOpacity onPress={() =>null}>
          <BannerImg
            source={require('~/Assets/poster.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>null}>
          <BannerImg
            source={require('~/Assets/poster.png')}
          />
        </TouchableOpacity>
    </Swiper>
  )
}

// banner
const BannerBox=styled.View`
  height:80px;
`
const BannerImg=styled.Image`
  width:100%;
`
const BannerPagination=styled.View`
  background-color:${Color.g3_color};
  opacity:0.7;
  border-radius:10px;
  padding-horizontal:10px;
  position:absolute;
  right:10px;
  top:50px;
`
const BannerText=styled.Text`
  ${Styles.s_font};
  color:${Color.w_color};
`
// category
const CategoryContainer=styled.View`
  margin-top:20px;
  padding:10px;
  height:20%;
`
const Title=styled.Text`
  ${Styles.m_font};
  font-weight:bold;
`
// poster
const PosterContainer=styled.TouchableOpacity`
  height:100%;
  aspect-ratio:0.6;
  padding-vertical:10px;
  margin-horizontal:10px;
`
const PosterBox=styled.View`
  border-radius:5px;
  height:90%;
  aspect-ratio:0.7;
  overflow:hidden;
`
const Poster=styled.Image`
  width:100%;
  height:100%;
  resize-mode:contain;
`
const PosterText=styled.Text`
  ${Styles.s_font};
  font-weight:bold;
  margin-horizontal:3px;
`
export default HomePage;
