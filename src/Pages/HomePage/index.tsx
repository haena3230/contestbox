// main home page
import React, { useEffect } from 'react';
import {View, TouchableOpacity, Text,StyleSheet, Image} from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
// component
import Header from '~/Components/Header';
import {Container,Styles,Color,DWidth} from '~/Styles';
import Swiper from 'react-native-swiper';
import {HashTag} from '~/Components/HashTag';
import Loading from '~/Components/Loading';
import {CategoryView} from '~/Components/Filter';
import {ErrorPage} from '~/Components/Error';
// data
import {useQuery} from '@apollo/client';
import {GET_HOTS} from '~/queries';
import {HomaPageProps} from '~/Types';
import {newStateArray} from '~/Components/Filter';

const HomePage = ({navigation}:HomaPageProps) => {
  useEffect(()=>{
    console.log('home')
  },[])
  // catrgory && hot data
  const { loading, error, data,refetch } = useQuery(GET_HOTS,{
    variables:{
      existPoster:true,
      sort:'HITS',
      applicationStatuses:['NOTSTARTED','INPROGRESS'],
      first:15
    },
    fetchPolicy:'cache-and-network'
  });
  let categoriesData=[];
  let hotData='';
  if(loading) return <Loading />
  if(error)return <ErrorPage onPress={async ()=>{
    try{
        await refetch({
            existPoster:true,
            sort:'HITS',
            applicationStatuses:['NOTSTARTED','INPROGRESS'],
            first:15
        })
        console.log('refetch')
    } catch(e){
        console.log('refetch err')
    }}} />
  if(data.categories){
    // max 10개
    categoriesData=CategoryView(data.categories).slice(0,9).map((cate)=>
    <TouchableOpacity  
        key = {cate[0].id} onPress={()=>{
        navigation.navigate('CategoryListPage',{
          categoryArray:newStateArray(cate),
          typeArray:null,
          conditionArray:null,
        });
        }}>
      <HashTag hashtag={cate[0].label} picked={false}/>
    </TouchableOpacity>
    )
  }
  if(data.contests){
    hotData=data.contests.edges.map((contest)=>
    <PosterContainer key = {contest.node.id.toString()} onPress={()=>
      navigation.push('DetailPage',{
        listId:contest.node.id
      })
    }>
      <Poster source={{uri:`${contest.node.posterURL},w_297,h_420`}}/>
      <PosterText numberOfLines={2}>{contest.node.title}</PosterText>
    </PosterContainer>
    )
  }
  return (
    <Container>
      <Header/>
      <View style={{flex:4,justifyContent:'center'}}>
        <Banner />
      </View>
      <View style={{flex:3}}>
        <Title>
          카테고리
        </Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft:10}}>
          {categoriesData}
        </ScrollView>
      </View>
      <View style={{flex:7}}>
        <Title>
          인기대회
        </Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft:10}}>
          {hotData}
        </ScrollView>
      </View>
    </Container>
  );
};

const Banner = ()=>{
  const renderPagination = (index, total)=> {
    return (
      <View style={styles.bannerPg}>
        <BannerText>{index+1}/{total}</BannerText>
      </View>
    )
}
  return(
    <Swiper autoplay={true} renderPagination={renderPagination}>
        <TouchableOpacity onPress={() =>null}>
          <Image
            style={styles.bannerImg}
            source={require('~/Assets/SearchBanner.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>null}>
          <Image
            style={styles.bannerImg}
            source={require('~/Assets/RegBanner.png')}
          />
        </TouchableOpacity>
    </Swiper>
  )
}

// banner
const styles=StyleSheet.create({
  bannerImg:{
    width:DWidth,
    height:DWidth*(1/3)
  },
  bannerPg:{
    backgroundColor:Color.g4_color,
    opacity:0.5,
    borderRadius:10,
    left:DWidth-50,
    bottom:30,
    justifyContent:'center',
    alignItems:'center',
    height:20,
    width:40
  }
})
const BannerText=styled.Text`
  ${Styles.s_font};
  color:${Color.w_color};
`
const Title=styled.Text`
  ${Styles.m_b_font};
  padding:10px 0 0 10px;
`
// poster
const PosterContainer=styled.TouchableOpacity`
  height:100%;
  aspect-ratio:0.57;
  margin-right:10px;  
`
const Poster=styled.Image`
  background-color:gray;
  height:80%;
  aspect-ratio:0.7;
  border-radius:8px;
  overflow:hidden;
`
const PosterText=styled.Text`
  ${Styles.s_m_font};
  margin-horizontal:3px;
`
export default HomePage;
