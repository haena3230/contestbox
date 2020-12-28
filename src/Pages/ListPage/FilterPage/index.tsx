// 필터 선택 페이지
import React,{useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Color} from '~/Styles';
import {useNavigation} from '@react-navigation/native';
// components
import {FilterHeader} from '~/Components/Header';
import {LongBtn} from '~/Components/Btn';
import {FilterList,CategoryList} from '~/Components/FilterList';
import {HashTag} from '~/Components/HashTag';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const FilterPage =()=>{
    const navigation=useNavigation();
    // 종류 관련
    const [sortPicked,setSortPicked]=useState(false);
    const [categoryPicked,setCategoryPicked]=useState(false);
    const [criteriaPicked,setCriteriaPicked]=useState(false);
    const onPressSort=()=>{
        setSortPicked(!sortPicked);
        setCategoryPicked(false);
        setCriteriaPicked(false);
    }
    const onPressCategory=()=>{
        setCategoryPicked(!categoryPicked);
        setSortPicked(false);
        setCriteriaPicked(false);
    }
    const onPressCriteria=()=>{
        setCriteriaPicked(!criteriaPicked);
        setSortPicked(false);
        setCategoryPicked(false);
    }
    return(
        <Container>
            <FilterHeader onPress={()=>navigation.goBack()}/>
            <Main>
                <List>
                    <FilterList title={'종류'} isPicked={sortPicked} onPress={onPressSort}/>
                    {sortPicked?(
                        <SortBox>
                            <SortBtn hashtag={'경시'} />
                            <SortBtn hashtag={'공모'} />
                            <SortBtn hashtag={'경진'} />
                        </SortBox>
                    ):
                        null
                    }
                </List>
                <List>
                    <FilterList title={'카테고리'} isPicked={categoryPicked} onPress={onPressCategory} />
                
                    {categoryPicked?(
                        <ScrollView>
                            <CategoryList title={'제목'} subTitle={test}/>
                        </ScrollView>
                    ):
                        null
                    }
                </List>
                 <List>
                    <FilterList title={'참여조건'} isPicked={criteriaPicked} onPress={onPressCriteria} />
                </List>
                {
                    criteriaPicked?(
                        <SortBox>
                            <SortBtn hashtag={'초등학생'} />
                            <SortBtn hashtag={'중학생'} />
                            <SortBtn hashtag={'고등학생'} />
                            <SortBtn hashtag={'대학생'} />
                            <SortBtn hashtag={'성인'} />
                        </SortBox>
                    ):(
                        null
                    )
                }
            </Main>
            <Bottom>
                <LongBtn />
            </Bottom>
        </Container>
    )
}

// 종류 버튼 
interface SortBtnProps{
    hashtag:string;
}
const SortBtn=({hashtag}:SortBtnProps)=>{
    const[picked,setPicked]=useState(false);
    const onPress=()=>{
        setPicked(!picked);
        // api 처리(picked 상태도)
    }
    return(
        <TouchableOpacity onPress={onPress}>
            <HashTag hashtag={hashtag} picked={picked}/>
        </TouchableOpacity>
    )
}
const Container = styled.View`
    width:100%;
    height:100%;
    flex:1;
    background-color:${Color.w_color};
`
const Main =styled.View`
    height:80%;
    border-top-width:1px;
    border-bottom-width:1px;
    border-color:${Color.g1_color};
`
const List = styled.View`
    border-bottom-width:1px;
    border-color:${Color.g1_color};
`
const Bottom=styled.View`
    margin:20px;
`
const SortBox=styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    padding:20px;
`
export default FilterPage;


const test=['스포츠','양해나','김남호'];