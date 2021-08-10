// SearchListPage
import React,{useState,useRef} from 'react';
import {View,ScrollView,RefreshControl} from 'react-native';
import {Container,Styles,Color} from '~/Styles';
import styled from 'styled-components/native';
// data
import {SearchListPageProps} from '~/Types';
import {GET_SEARCH_LISTS} from '~/queries';
import {useQuery} from '@apollo/client';
// components
import {SortBtn,FilterBtn} from  '~/Components/Btn';
import {SortComponent} from '~/Components/Sort';
import TextList from '~/Components/TextList';
import ToTop from '~/Components/ToTop';
import Loading, { LastData } from '~/Components/Loading';
import {pickedIdArray} from '~/Components/Filter';
import { ErrorPage } from '~/Components/Error';
import { categoriesVar, conditionsVar, sortVar, typesVar } from '~/global';
import { SearchBarSmall } from '~/Components/SearchBar';

const SearchListPage =(props:SearchListPageProps)=>{
    
    const {search}=props.route.params;
    const typeIdArray = pickedIdArray(typesVar())
    const conditionIdArray = pickedIdArray(conditionsVar())
    const categoryIdArray = pickedIdArray(categoriesVar())
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
    const sortState = sortVar()
    const[sort,setSort]=useState<boolean>(false);
    
    // list data
    let listData='';

    const {loading,error,data,fetchMore,refetch }=useQuery(GET_SEARCH_LISTS,{
        variables:{
            after:null,
            first:8,
            search:search,
            sort:sortState.status,
            types:typeIdArray,
            conditions:conditionIdArray,
            categories:categoryIdArray,
        }
    })
    // 정렬버튼 함수
    const onPressTagOne=()=>{
        sortVar({
            statusName:'추천순',
            status:'LATEST',
            statusArr:[true,false,false]
        })
        setSort(!sort);
    }
    const onPressTagTwo=()=>{
        sortVar({
            statusName:'조회순',
            status:'HITS',
            statusArr:[false,true,false]
        })
        setSort(!sort);
    }
    const onPressTagThree=()=>{
        sortVar({
            statusName:'등록순',
            status:'LATEST',
            statusArr:[false,false,true]
        }) 
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
                after:null,
                first:8,
                search:search,
                sort:sortState.status,
                types:typeIdArray,
                conditions:conditionIdArray,
                categories:categoryIdArray,
            })
            setRefreshing(false);
        } catch(e){
            console.log('refetch err')
        }
    }
    if(loading) return(
    <Container>
        <SearchBarSmall navigation={props.navigation}/>
        <Loading />
    </Container>)
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
            host={'test'}
            viewScrap={false}
            isScrap={false}
            />
    )}
    // pagination
    const onEndReached=()=>{
        try{
            fetchMore({
            variables:{
                after:data.contests.pageInfo.endCursor,
                first:8,
                search:search,
                sort:sortState.status,
                types:typeIdArray,
                conditions:conditionIdArray,
                categories:categoryIdArray,
            }
        })
        }catch(e){
            console.log('fetchmore err ')
            console.log(e)
        }
    }
    return(
        <Container>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                    onScroll={(e)=>{
                        if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height && data.contests.pageInfo.hasNextPage===true){
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
                        count={data.contests.totalCount} 
                        onPressFilter={()=>
                            props.navigation.push('SearchFilterPage',{
                                search:search,
                            })}
                        onPressSort={()=>setSort(!sort)}
                        sortState={sortState.statusName}
                        badgeNumber={typeIdArray.length+conditionIdArray.length+categoryIdArray.length}
                        />
                    <View>
                        {listData}
                    </View>
                    {data.contests.pageInfo.hasNextPage?<Loading />:<LastData />}
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
            <View style={{flexDirection:'row',marginRight:2}}>
                <SortBtn onPressSort={onPressSort} state={sortState}/>
                <FilterBtn onPressFilter={onPressFilter} number={badgeNumber}/>
            </View>
        </BarBox>
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
export default SearchListPage;