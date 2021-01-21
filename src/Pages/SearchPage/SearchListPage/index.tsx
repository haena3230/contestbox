// SearchListPage
import React,{useState,useRef} from 'react';
import {View,ScrollView} from 'react-native';
import {Container,Styles,Color} from '~/Styles';
import styled from 'styled-components/native';
// data
import {SearchListPageProps} from '~/Types';
// components
import {SearchBarSmall} from '~/Components/SearchBar';
import {SortBtn,FilterBtn,MapBtn} from  '~/Components/Btn';
import {SortComponent} from '~/Components/Sort';
import TextList,{ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';

const SearchListPage =(props:SearchListPageProps)=>{
    const {search} = props.route.params;
    // 필터 선택
    const onPressFilter =()=>{
        props.navigation.navigate('SearchFilterPage');
    }
    // totop
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };

    return(
        <Container>
            <ScrollView ref={scrollRef}>
                <SearchBarSmall onPressSearch={()=>null} onPressBack={()=>props.navigation.goBack()}/>
                <SearchListBar  search={search}  count={4} onPressFilter={onPressFilter}/>
                <View style={{padding:5}}>
                    <ListBox onPress={()=>props.navigation.navigate('DetailPage',{
                        listId:'5ffb27fe37d0abdc19c3209d',
                    })}>
                        <TextList 
                        recruit={'NOTSTARTED'} 
                        deadline={'2020-12-12T12:12:12Z'}
                        title={'title'} 
                        viewcount={5}
                        />
                    </ListBox>
                    
                </View>
            </ScrollView>
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}
interface SearchListBarProps{
    search:string|undefined;
    count:number;
    onPressFilter:()=>void;
}
const SearchListBar=({search,count,onPressFilter}:SearchListBarProps)=>{
    // 정렬 버튼
    const[sortState,setSortState]=useState<string>('추천순');
    const[sort,setSort]=useState<boolean>(false);
    const[one,setOne]=useState<boolean>(true);
    const[two,setTwo]=useState<boolean>(false);
    const[three,setThree]=useState<boolean>(false);
    const onPressTagOne=()=>{
        setOne(true);
        setTwo(false);
        setThree(false);
        setSort(!sort);
        setSortState('추천순');
    }
    const onPressTagTwo=()=>{
        setOne(false)
        setTwo(true)
        setThree(false)
        setSort(!sort);
        setSortState('조회순');
    }
    const onPressTagThree=()=>{
        setOne(false)
        setTwo(false)
        setThree(true)
        setSort(!sort);
        setSortState('등록순');
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    return(
        <BarBox>
            <View style={{flexDirection:'row'}}>
                <BarBoxText>' {search} ' 검색결과 </BarBoxText>
                <BarBoxCount> {count}</BarBoxCount>
            </View>
            <View style={{flexDirection:'row'}}>
                <SortBtn onPressSort={onPressSort} state={sortState}/>
                <SortComponent 
                onPressCancle={onPressSort} 
                modalVisible={sort} 
                one={one}
                two={two}
                three={three}
                onPressTagOne={onPressTagOne}
                onPressTagTwo={onPressTagTwo}
                onPressTagThree={onPressTagThree}
                />
                <FilterBtn onPressFilter={onPressFilter}/>
                <MapBtn onPressMap={()=>null}/>
            </View>
        </BarBox>
    )
}

const BarBox=styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:10px;
`
const BarBoxText=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
`
const BarBoxCount=styled.Text`
    ${Styles.m_font};
    color:${Color.g3_color};
`
export default SearchListPage;