// SearchListPage
import React,{useState,useRef, useEffect} from 'react';
import {View,ScrollView, Text} from 'react-native';
import {Container,Styles,Color} from '~/Styles';
import styled from 'styled-components/native';
// data
import {SearchListPageProps} from '~/Types';
import {GET_LISTS} from '~/queries';
import {useQuery} from '@apollo/client';
import {useSelector} from 'react-redux';
import {RootState} from '~/App';
// components
import {SearchBarSmall} from '~/Components/SearchBar';
import {SortBtn,FilterBtn,MapBtn} from  '~/Components/Btn';
import {SortComponent} from '~/Components/Sort';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Loading from '~/Components/Loading';
import {pickedIdArray} from '~/Components/Filter';

const SearchListPage =(props:SearchListPageProps)=>{
    const {search} = props.route.params;
    // 마운트를 위한 상태
    const [state,setState]=useState(false);
    // category & type & condition
    const categories =useSelector((state:RootState)=>state.query.SLCategoryArray)
    const types= useSelector((state:RootState)=>state.query.SLTypeArray)
    const conditions= useSelector((state:RootState)=>state.query.SLConditionArray)
    // state
    const [category,setCategory]=useState<Array<{id:string,label:string,value:boolean}>>(categories)
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@')
    },[state])
    // 필터 선택
    const onPressFilter =()=>{
        props.navigation.navigate('SearchFilterPage');
    }
    // totop
    let totop=false;
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    // sort
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
        setSortStatus('LATEST')
        setSort(!sort);
        setSortState('추천순');
    }
    const onPressTagTwo=()=>{
        setOne(false)
        setTwo(true)
        setThree(false)
        setSortStatus('HITS')
        setSort(!sort);
        setSortState('조회순');
    }
    const onPressTagThree=()=>{
        setOne(false)
        setTwo(false)
        setThree(true)
        setSortStatus('LATEST')
        setSort(!sort);
        setSortState('등록순');
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    // list data
    const [sortStatus,setSortStatus]=useState<string>('LATEST')
    const {loading,error,data}=useQuery(GET_LISTS,{
        variables:{
            search:search,
            sort:sortStatus,
            categories:pickedIdArray(category),
            conditions:pickedIdArray(conditions),
            types:pickedIdArray(types)
        }
    })
    let listData='';
    if(loading) return <Loading />
    if(error) return <Text>err</Text>
    if(data&&data.contests){
    listData=data.contests.edges.map((data)=>
        <ListBox key = {data.node.id.toString()} onPress={()=>{
            props.navigation.navigate('DetailPage',{
                listId:data.node.id,
            })
        }}>
        <TextList 
            recruit={data.node.application.status} 
            deadline={data.node.application.period.endAt}
            title={data.node.title} 
            viewcount={data.node.hits}
            />
            {data.node.categories!==null?(
            <TagBox>
                {data.node.categories.slice(0,3).map((tag)=>
                <HashTag key={tag.id.toString()} hashtag={tag.label} picked={false}/>
                )}
                {data.node.categories.length>3?(
                <HashTag hashtag={'+'+ (data.node.categories.length-3)} picked={false}/>
                ):(
                null
                )}
            </TagBox>
            ):null}
        </ListBox>
    )
        if(listData.length>3) totop=true
        else totop=false;
    }
    return(
        <Container>
            <ScrollView ref={scrollRef}>
                <SearchBarSmall navigation={props.navigation} route={props.route}/>
                <SearchListBar 
                    search={search} 
                    count={data.contests.edges.length} 
                    onPressFilter={onPressFilter}
                    onPressSort={()=>setSort(!sort)}
                    sortState={sortState}
                    badgeNumber={pickedIdArray(category).length+pickedIdArray(conditions).length+pickedIdArray(types).length}
                    />
                <View style={{padding:5}}>
                    {listData}
                </View>
            </ScrollView>
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
                {totop?(
                    <ToTop onPressToTop={onPressToTop}/>
                ):(
                    null
                )}
        </Container>
    )
}
interface SearchListBarProps{
    search:string|undefined;
    count:number;
    onPressFilter:()=>void;
    onPressSort:()=>void;
    sortState:string;
    badgeNumber:number;
}
const SearchListBar=({search,count,onPressFilter,onPressSort,sortState,badgeNumber}:SearchListBarProps)=>{
    
    return(
        <BarBox>
            <View style={{flexDirection:'row'}}>
                <BarBoxText>' {search} ' 검색결과 </BarBoxText>
                <BarBoxCount> {count}</BarBoxCount>
            </View>
            <View style={{flexDirection:'row'}}>
                <SortBtn onPressSort={onPressSort} state={sortState}/>
                
                <FilterBtn onPressFilter={onPressFilter} number={badgeNumber}/>
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