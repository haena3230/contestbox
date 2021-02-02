// main home page
import React from 'react';
import {View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
// component
import Header from '~/Components/Header';
import {Container,Styles,Color} from '~/Styles';
import Swiper from 'react-native-swiper';
import {HashTag} from '~/Components/HashTag';
// navi
import {HomaPageProps} from '~/Types';

const HomePage = ({navigation}:HomaPageProps) => {
  return (
    <Container>
      <Header />
      <BannerBox>
        <Banner />
      </BannerBox>
      <Category onPressCategory={()=>
        navigation.navigate('CategoryListPage',{
          category:'test'
        })}/>
      <BestContest />
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

interface CategoryProps{
  onPressCategory:()=>void;
}
const Category=({onPressCategory}:CategoryProps)=>{
  return(
    <CategoryContainer>
      <Title>
        카테고리
      </Title>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingVertical:10}}>
        <TouchableOpacity onPress={onPressCategory}>
          <HashTag hashtag={'test'} picked={false}/>
        </TouchableOpacity>
      </ScrollView>
    </CategoryContainer>
  )
}

const BestContest=()=>{
  return(
    <View style={{padding:10,height:'50%'}}>
      <Title>
        인기대회
      </Title>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <PosterContainer>
          <PosterBox>
            <Poster source={require('~/Assets/poster.png')}/>
          </PosterBox>
          <PosterText>이름입니다</PosterText>
        </PosterContainer>
        <PosterContainer>
          <PosterBox>
            <Poster source={require('~/Assets/poster.png')}/>
          </PosterBox>
          <PosterText>이름입니다</PosterText>
        </PosterContainer>
        <PosterContainer>
          <PosterBox>
            <Poster source={require('~/Assets/poster.png')}/>
          </PosterBox>
          <PosterText>이름입니다</PosterText>
        </PosterContainer>
      </ScrollView>
    </View>
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
`
export default HomePage;
