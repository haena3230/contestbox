  // 첫번째 메인 탭 MainPage.tsx
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
// Component
import Header from '~/Components/Header';
import {HashTag} from '~/Components/HashTag';
import {SearchBar} from '~/Components/SearchBar';

// style 
import {Color,Styles,Container,DWidth} from '~/Styles';
import {TouchableOpacity } from 'react-native-gesture-handler';
// data
import {SearchPageProps} from '~/Types';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {CLCategoryAction} from '~/Store/actions';
import {newStateArray} from '~/Components/Filter';

const SearchPage = ({navigation}:SearchPageProps) => {
  const dispatch=useDispatch();
  const storeNewArrayCategories=(Array:Array<string>)=>{
    dispatch(CLCategoryAction(Array))
  }
  // catrgory data
  const categories= useSelector((state:RootState)=>state.query.categoriesArray)
  return (
      <Container>
        <Header />
        <MainContainer>
          <Title>
            <Text style={Styles.b_font}>어떤 </Text>
            <Point>대회</Point>
            <Text style={Styles.b_font}>를 찾고계신가요?</Text>
          </Title>
          <View style={{alignItems:'center'}}>
            <SearchBar navigation={navigation}/>
          </View>
          <Category>
            <Title>
              <Text style={Styles.m_font}>카테고리</Text>
            </Title>
                <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:20}}>
                  {categories.map((cate)=>{
                    return(
                      <TouchableOpacity  key = {cate[0].id} onPress={()=>{
                          navigation.navigate('CategoryListPage'),
                          storeNewArrayCategories(newStateArray(cate))
                          }}>
                        <HashTag hashtag={cate[0].label} picked={false}/>
                      </TouchableOpacity>
                    )
                  })}                  
                </View>
          </Category>
        </MainContainer>
      </Container>
  );
};


const MainContainer=styled.View`
  height:100%;
  justify-content:center;
  padding:${DWidth > 480 ? '50px':'20px'};
`
const Title=styled.View`
  width:100%;
  flex-direction:row; 
`

const Point = styled.Text`
  ${Styles.b_font};
  color:${Color.p_color};
`

const Category=styled.View`
  width:100%;
  margin-vertical:20px;
`


export default SearchPage;
