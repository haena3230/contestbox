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
  border:'#E8EBEE',
  artbox:'#FAFBFC',
  place_holder:'#9F9F9F',
  background:'#F4F5F7',
  gray:'#666666',
  b_color: '#000000',
  p_color: '#039BE5',
  p_l_color:'#F0FAFF',
  r_color:'#C13259',
};

// 텍스트 스타일
export const Styles = StyleSheet.create({
  // 패딩, 색상 없
  ss_font:{
    fontSize: DWidth > 480 ? 14 : 8,
    fontWeight:"500"
  },
  s_font: {
    fontSize: DWidth > 480 ? 16 : 11,
  },
  m_font: {
    fontSize: DWidth > 480 ? 20 : 13,
  },
  mb_font:{
    fontSize: DWidth > 480 ? 22 : 16,
  },
  b_font: {
    fontSize: DWidth > 480 ? 24 : 18,
  },
  // Medium 
  ss_m_font:{
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 14 : 8,
    color:Color.b_color
  },
  s_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 16 : 11,
    color:Color.b_color
  },
  m_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 20 : 13,
    color:Color.b_color
  },
  mb_m_font:{
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 22 : 16,
    color:Color.b_color
  },
  b_m_font: {
    fontFamily:'NotoSansKR-Medium',
    fontSize: DWidth > 480 ? 24 : 18,
    color:Color.b_color
  },
  // bold
  ss_b_font:{
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 14 : 8,
    color:Color.b_color
  },
  s_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 16 : 11,
    color:Color.b_color
  },
  m_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 20 : 13,
    color:Color.b_color
  },
  mb_b_font:{
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 22 : 16,
    color:Color.b_color
  },
  b_b_font: {
    fontFamily:'NotoSansKR-Bold',
    fontSize: DWidth > 480 ? 24 : 18,
    color:Color.b_color
  },
});

 // 페이지 스타일
 export const Container=styled.View`
  background-color:${Color.background};
  padding:10px;
  flex:1;
`
// 비율 
interface flexProps{
  flex:number;
  padding:number;
}
// 아이콘 사이즈
export const IconSize={
  ssicon:DWidth>480?20:15,
  sicon:DWidth>480?22:17,
  icon:DWidth>480?27:22,
  bicon:DWidth>480?35:30,
  bbicon:DWidth>480?40:35,
}

