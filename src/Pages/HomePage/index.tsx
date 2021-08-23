// main home page
import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Image,ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
// component
import Header from '~/Components/Header';
import {Container,Styles,Color,DWidth} from '~/Styles';
import Swiper from 'react-native-swiper';
import Loading from '~/Components/Loading';
import {ErrorPage} from '~/Components/Error';
// data
import {useQuery} from '@apollo/client';
import {GET_HOT_CONTESTS} from '~/queries';
import {HomaPageProps} from '~/Types';
import { status } from '~/Components/TextList';
import { HotCategory } from '~/Components/CategoryBtn';

const HomePage = ({navigation}:HomaPageProps) => {
  const [refreshing,setRefreshing]=useState<boolean>(false);
  // catrgory && hot data
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_HOT_CONTESTS,{
    variables:{
      after:null,
      existPoster:true,
      sort:'HITS',
      applicationStatuses:['NOTSTARTED','INPROGRESS'],
      first:8
    }
  });
  let hotData=``;
  if(loading) return <Loading />
  if(error)return <ErrorPage onPress={()=>onRefetch} />
  // refetch
  const onRefetch =async ()=>{
    try{
          await refetch({
              after:null,
              existPoster:true,
              sort:'HITS',
              applicationStatuses:['NOTSTARTED','INPROGRESS'],
              first:8
          })
      } catch(e){
          console.log('refetch err')
      }
  }
  const onRefresh=()=>{
      console.log('refetch')
      setRefreshing(true);
      onRefetch()
      setRefreshing(false);
  }
  // fetchMore
  const onEndReached = ()=>{
    try{
      fetchMore({
          variables:{
              after:data.contests.pageInfo.endCursor,
              existPoster:true,
              sort:'HITS',
              applicationStatuses:['NOTSTARTED','INPROGRESS'],
              first:8
          }
      })
    }catch(e){
      console.log('fetch error')
      console.log(e)
    }
      
  }

  if(data.contests){
    hotData=data.contests.edges.map((contest)=>
        <View style={{width:'48%', justifyContent:'center'}} key = {contest.node.id.toString()}>
    <PosterContainer onPress={()=>
      navigation.push('DetailPage',{
        listId:contest.node.id
      })
    }>
      <Recruitbox>
          {status(contest.node.application.status,contest.node.application.period.endAt)}
      </Recruitbox>
      <Image
          source={{uri:`${contest.node.posterURL},w_297,h_420`}}
          style={{width:'100%',height:'100%',borderRadius:10}}
      />
      <LinearGradient 
        colors={['transparent', Color.b_color]} 
        start={{ x: 0.5, y: 0.3 }} end={{ x: 0.5, y: 1 }}
        style={{position:'absolute',width:'100%',height:'100%', opacity:0.7,borderRadius:10}} />
      <PosterText numberOfLines={2}>{contest.node.title}</PosterText>
    </PosterContainer>
        </View>
    )
  }
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      onScroll={(e)=>{
            if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height && data.contests.pageInfo.hasNextPage){
                onEndReached()
            }}}
      refreshControl={
        <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[Color.p_color]}
            />}
      >
      <Container>
          <Header/>
          <View style={{height:(DWidth-20)*(1/3)}}>
            <Banner />
          </View>
          <Title>
            인기카테고리
          </Title>
          <HotCategory />
          <Title>
            인기대회
          </Title>
          <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between'}}>
            {hotData}
          </View>
      </Container>
      </ScrollView>
  )
}

// banner
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
        <TouchableOpacity onPress={() =>null} >
          <Image source={require('~/Assets/FirstBanner.png')} style={styles.bannerImg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>null}>
          <Image source={require('~/Assets/SecondBanner.png')} style={styles.bannerImg}/>
        </TouchableOpacity>
    </Swiper>
  )
}


// banner
const styles=StyleSheet.create({
  bannerImg:{
    width:DWidth-20,
    height:(DWidth-20)*(1/3),
    backgroundColor:'#1C7698',
    borderRadius:10,
  },
  bannerPg:{
    backgroundColor:Color.b_color,
    opacity:0.4,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    height:20,
    width:50,
    position:'absolute',
    bottom:10,
    right:10
  }
})
const BannerText=styled.Text`
  ${Styles.s_font};
  color:${Color.w_color};
`
const Title=styled.Text`
  ${Styles.m_b_font};
  padding:20px 0 15px 0;
`
// poster
const PosterContainer=styled.TouchableOpacity`
   
  width:100%;
  aspect-ratio:0.7;
  margin-bottom:10px;
`
export const PosterText=styled.Text`
  ${Styles.s_m_font};
  color:${Color.w_color};
  padding-horizontal:3px;
  position:absolute;
  padding:10px;
  top:73%;
`
export const Recruitbox=styled.View`
  flex-direction:row;
  position:absolute;
  left:10px;
  top:70%
  z-index:3;
`
export default HomePage;
