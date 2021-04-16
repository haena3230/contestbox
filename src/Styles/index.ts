// 스타일 모음
import {PixelRatio, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
  
// 디바이스 맞춤 너비
import { Dimensions } from 'react-native';

export const DHeight = Dimensions.get('window').height;
export const DWidth = Dimensions.get('window').width;

// 색상
export const Color = {
  //color
  w_color: '#FFFFFF',
  l_color: '#F8F9FA',
  g1_color: '#E4E5E6',
  g2_color: '#DADADA',
  g3_color: '#9E9E9E',
  g4_color: '#505050',
  b_color: '#000000',
  p_color: '#3A9BFF',
  p_l_color:'#F0FAFF',
  r_color:'#C13259',
};

// 텍스트 스타일
export const Styles = StyleSheet.create({
  // 패딩, 색상 없
  ss_font:{
    fontSize: DWidth > 480 ? 15 : 11,
    fontWeight:"500"
  },
  s_font: {
    fontSize: DWidth > 480 ? 17 : 13,
  },
  m_font: {
    fontSize: DWidth > 480 ? 20 : 16,
  },
  mb_font:{
    fontSize: DWidth > 480 ? 22 : 18,
  },
  b_font: {
    fontSize: DWidth > 480 ? 24 : 20,
  },
  // Medium 
  ss_m_font:{
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 15 : 11,
    color:Color.g4_color
  },
  s_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 17 : 13,
    color:Color.g4_color
  },
  m_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 20 : 16,
    color:Color.g4_color
  },
  mb_m_font:{
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 22 : 18,
    color:Color.g4_color
  },
  b_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 24 : 20,
    color:Color.g4_color
  },
  // bold
  ss_b_font:{
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 15 : 11,
    color:Color.g4_color
  },
  s_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 17 : 13,
    color:Color.g4_color
  },
  m_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 20 : 16,
    color:Color.g4_color
  },
  mb_b_font:{
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 22 : 18,
    color:Color.g4_color
  },
  b_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 24 : 20,
    color:Color.g4_color
  },
});

 // 페이지 스타일
 export const Container=styled.View`
  flex:1;
  background-color:${Color.l_color};
`
// 비율 
interface flexProps{
  flex:number;
  padding:number;
}
// 아이콘 사이즈
export const IconSize={
  icon:DWidth>480?27:22,
  sicon:DWidth>480?22:17,
}

