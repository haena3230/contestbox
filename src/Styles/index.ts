// 스타일 모음
import {StyleSheet} from 'react-native';

// 색상
export const Color = {
  //color
  w_color: '#FFFFFF',
  l_color: '#E1E1E1',
  g_color: '#848484',
  b_color: '#000000',
  p_color: '#5DAFF5',
  p_l_color:'#F0FAFF',
};

// 텍스트 스타일
export const Styles = StyleSheet.create({
  ss_font: {fontSize: 10},
  s_font: {fontSize: 13},
  m_font: {fontSize: 15},
  b_font: {fontSize: 18},
});

 // 페이지 스타일
 export const Page=StyleSheet.create({
     page_container:{
        flex:1,
        backgroundColor:Color.w_color,
        
    },
});
  
// 디바이스 맞춤 너비
import { Dimensions } from 'react-native';

export const DHeight = Dimensions.get('window').height;
export const DWidth = Dimensions.get('window').width;
