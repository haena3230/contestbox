// 스타일 모음
import {StyleSheet} from 'react-native';
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
  g2_color: '#9E9E9E',
  g3_color: '#505050',
  b_color: '#000000',
  p_color: '#3A9BFF',
  p_l_color:'#F0FAFF',
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
    fontSize: DWidth > 480 ? 20 : 16,
  },
  b_font: {
    fontSize: DWidth > 480 ? 22 : 18,
  },
});

 // 페이지 스타일
 export const Container=styled.View`
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  padding:${DWidth > 480 ? '50px' : '10px'};
  background-color:${Color.l_color};
`

// 아이콘 사이즈
export const IconSize={
  icon:DWidth>480?25:20,
}

