// SearchListPage
import React,{useState,useRef, useEffect} from 'react';
import {View,ScrollView,RefreshControl,Text, TouchableOpacity} from 'react-native';
import {Container,Styles,Color, IconSize, DWidth} from '~/Styles';
import styled from 'styled-components/native';
// data
import {SearchListPageProps, SearchPageProps} from '~/Types';
import {GET_SEARCH_LISTS} from '~/queries';
import {useQuery} from '@apollo/client';
import {SortStatus} from '~/Types';
// components
import Arrow from '~/Assets/chevron-left-solid.svg';
import Search from '~/Assets/search-solid.svg';
import {SortBtn,FilterBtn} from  '~/Components/Btn';
import {SortComponent} from '~/Components/Sort';
import TextList from '~/Components/TextList';
import ToTop from '~/Components/ToTop';
import Loading, { LastData } from '~/Components/Loading';
import {pickedIdArray,newStateArray} from '~/Components/Filter';
import { InfoModalComponent } from '~/Components/Modal';
import { ErrorPage } from '~/Components/Error';
import { TextInput } from 'react-native-gesture-handler';

interface pageInfoProps{
    endCursor:string,
    hasNextPage:boolean
}
const SearchListPage =(props:SearchListPageProps)=>{
    useEffect(()=>{
        console.log('searchListPage');
    },[])
    const {search,typeArray,conditionArray}=props.route.params;
    const pickedTypeId=pickedIdArray(typeArray);
    const pickedConditionId=pickedIdArray(conditionArray);
    const[map,setMap]=useState<boolean>(false);
    // 필터 선택
    const onPressFilter =()=>{
        if(!!!typeArray){
            props.navigation.push('SearchFilterPage',{
                search:search,
                typeArray:initTypeArray,
                conditionArray:initConditionArray
            });
        }
        else{
            props.navigation.push('SearchFilterPage',{
                search:search,
                typeArray:typeArray,
                conditionArray:conditionArray
            });
        }
    }
    // totop
    const [totop,setTotop]=useState<boolean>(false);
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    // sort
    // 정렬 버튼
    const[sortStatus,setSortStatus]=useState('LATEST');
    const[sortState,setSortState]=useState<SortStatus>({
        statusName:'추천순',
        status:'LATEST',
        statusArr:[true,false,false]
    });
    const[sort,setSort]=useState<boolean>(false);
    
    // list data
    let listData='';
    let initTypeArray=[];
    let initConditionArray=[];

    let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const {loading,error,data,fetchMore,refetch }=useQuery(GET_SEARCH_LISTS,{
        variables:{
            after:pageInfo.endCursor,
            first:10,
            search:search,
            sort:sortStatus,
            types:pickedTypeId,
            conditions:pickedConditionId
        },
        fetchPolicy:'network-only'
    })
    // 정렬버튼 함수
    const onPressTagOne=()=>{
        setSortState({
            statusName:'추천순',
            status:'LATEST',
            statusArr:[true,false,false]
        })
        setSortStatus('LATEST')
        setSort(!sort);
    }
    const onPressTagTwo=()=>{
        setSortState({
            statusName:'조회순',
            status:'HITS',
            statusArr:[false,true,false]
        })
        setSortStatus('HITS')
        setSort(!sort);
    }
    const onPressTagThree=()=>{
        setSortState({
            statusName:'등록순',
            status:'LATEST',
            statusArr:[false,false,true]
        }) 
        setSortStatus('LATEST')
        setSort(!sort);
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:sortStatus,
                types:pickedTypeId,
                conditions:pickedConditionId
            })
            setRefreshing(false);
        } catch(e){
            console.log('refetch err')
        }
    }
    if(loading) return <Loading />
    if(error) return <ErrorPage onPress={onRefresh} />
    if(data&&data.contests){
    listData=data.contests.edges.map((data)=>
        <TextList
            key = {data.node.id.toString()} 
            onPress={()=>{
                props.navigation.navigate('DetailPage',{
                    listId:data.node.id,
                })
            }}
            recruit={data.node.application.status} 
            deadline={data.node.application.period.endAt}
            title={data.node.title} 
            viewcount={data.node.hits}
            categories={data.node.categories}
            poster={data.node.posterURL}
            />
    )
    pageInfo=data.contests.pageInfo;
    initTypeArray=newStateArray(data.types);
    initConditionArray=newStateArray(data.conditions);
    }
    // pagination
    const onEndReached=()=>{
        if(pageInfo.hasNextPage===true)
            {   
                fetchMore({
                    variables:{
                        after:pageInfo.endCursor,
                        first:10,
                        search:search,
                        sort:sortState.status,
                        types:pickedTypeId,
                        conditions:pickedConditionId
                    }
                })
            }
    }
    return(
        <Container>
                <ScrollView 
                    ref={scrollRef}
                    onScroll={(e)=>{
                        if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height){
                            onEndReached()
                        }
                        if (e.nativeEvent.contentOffset.y===0){
                            setTotop(false);
                        }                            
                    }}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                            colors={[Color.p_color]}
                            
                            />
                    }
                    onScrollBeginDrag={()=>setTotop(true)}
                    >
                    <SearchBarSmall navigation={props.navigation}/>
                    <SearchListBar 
                        search={search} 
                        count={data.contests.edges.length} 
                        onPressFilter={()=>onPressFilter()}
                        onPressSort={()=>setSort(!sort)}
                        onPressMap={()=>setMap(!map)}
                        sortState={sortState.statusName}
                        badgeNumber={pickedConditionId.length+pickedTypeId.length}
                        />
                    <View style={{padding:5}}>
                        {listData}
                    </View>
                    {pageInfo.hasNextPage?<Loading />:<LastData />}
                </ScrollView>
            <SortComponent 
                onPressCancle={onPressSort} 
                modalVisible={sort} 
                one={sortState.statusArr[0]}
                two={sortState.statusArr[1]}
                three={sortState.statusArr[2]}
                onPressTagOne={onPressTagOne}
                onPressTagTwo={onPressTagTwo}
                onPressTagThree={onPressTagThree}
                />
                {totop&&!map?(
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
    onPressMap:()=>void;
    sortState:string;
    badgeNumber:number;
}
const SearchListBar=({search,count,onPressFilter,onPressSort,onPressMap,sortState,badgeNumber}:SearchListBarProps)=>{
    
    return(
        <BarBox>
            <View style={{flexDirection:'row'}}>
                <BarBoxText>' {search} ' 검색결과 </BarBoxText>
                <BarBoxCount> {count}</BarBoxCount>
            </View>
            <View style={{flexDirection:'row'}}>
                <SortBtn onPressSort={onPressSort} state={sortState}/>
                <FilterBtn onPressFilter={onPressFilter} number={badgeNumber}/>
            </View>
        </BarBox>
    )
}

export const SearchBarSmall=(props:SearchPageProps)=>{
    const[infoModal,setInfoModal]=useState<boolean>(false);
    const[searchText,setSearchText]=useState<string|null>();
    const onSubmet=()=>{
        if(!searchText){
            setInfoModal(true);
            setTimeout(()=>{
                setInfoModal(false);
            },1500);
        }
        else{
        props.navigation.navigate('SearchListPage',{
            search:searchText,
            typeArray:null,
            conditionArray:null,
            });
        }
    }
    return(
        <SearchHeader>
            <Arrow onPress={()=>props.navigation.goBack()} height={IconSize.sicon} width={IconSize.sicon} color={Color.gray}/>
            <SmallSearchBarStyle>
                <TouchableOpacity onPress={onSubmet} style={{paddingHorizontal:15}}>
                    <Search height={IconSize.sicon} width={IconSize.sicon} color={Color.gray}/>
                </TouchableOpacity>
                <TextInput
                    style={Styles.m_font}
                    placeholder={'검색어를 입력해 주세요'} 
                    value={searchText} 
                    onChangeText={(text)=>{setSearchText(text)}} 
                    maxLength={35}
                    onSubmitEditing={onSubmet}
                    />
            </SmallSearchBarStyle>
            <InfoModalComponent 
                Info={'검색어를 입력해 주세요'}
                modalVisible={infoModal}
                />
        </SearchHeader>
    )
}

// status bar
const BarBox=styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`
const BarBoxText=styled.Text`
    ${Styles.m_b_font};
`
const BarBoxCount=styled.Text`
    ${Styles.m_m_font};
`
// search bar
const SearchHeader=styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
`
const SmallSearchBarStyle=styled.View`
  width:90%;
  height:${DWidth > 480 ? 60 : 40}px;
  background-color:${Color.w_color};
  border-radius:20px;
  flex-direction:row;
  align-items:center;
  margin-vertical:10px;
  margin-left:10px;
  border-width:1px;
  border-color:${Color.border};
`
export default SearchListPage;