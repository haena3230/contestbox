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
  ss_font:{
    fontSize: DWidth > 480 ? 14 : 10,
  },
  s_font: {
    fontSize: DWidth > 480 ? 16 : 12,
  },
  m_font: {
    fontSize: DWidth > 480 ? 18 : 14,
  },
  b_font: {
    fontSize: DWidth > 480 ? 22 : 18,
  },
});

 // 페이지 스타일
 export const Container=styled.View`
  width:100%;
  height:100%;
  background-color:${Color.l_color};
`

// 아이콘 사이즈
export const IconSize={
  icon:DWidth>480?25:20,
  sicon:DWidth>480?20:15,
}

