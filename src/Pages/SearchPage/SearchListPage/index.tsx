// SearchListPage
import React,{useState,useRef} from 'react';
import {View,ScrollView,RefreshControl,Text} from 'react-native';
import {Container,Styles,Color} from '~/Styles';
import styled from 'styled-components/native';
// data
import {SearchListPageProps} from '~/Types';
import {GET_LISTS} from '~/queries';
import {useQuery} from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {SortStatus} from '~/Types';
// components
import {SearchBarSmall} from '~/Components/SearchBar';
import {SortBtn,FilterBtn,MapBtn, ListBtn} from  '~/Components/Btn';
import {SortComponent} from '~/Components/Sort';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Loading, { LastData } from '~/Components/Loading';
import {pickedIdArray,pickedIdArraies,newStateArray} from '~/Components/Filter';
import { SLConditionAction, SLTypeAction } from '~/Store/actions';
import {Map} from '~/Components/Map';
interface pageInfoProps{
    endCursor:string,
    hasNextPage:boolean
}
const SearchListPage =(props:SearchListPageProps)=>{
    const search=useSelector((state:RootState)=>state.query.SearchText)
    // 마운트를 위한 상태
    const[map,setMap]=useState<boolean>(false);
    // category & type & condition
    const dispatch=useDispatch();
    const storeSLTypeNewArray=(Array:Array<any>)=>{
        dispatch(SLTypeAction(Array))
    }
    const storeSLConditionNewArray=(Array:Array<any>)=>{
        dispatch(SLConditionAction(Array))
    }
    // const categories =useSelector((state:RootState)=>state.query.SLCategoryArray)
    const types= useSelector((state:RootState)=>state.query.SLTypeArray)
    const conditions= useSelector((state:RootState)=>state.query.SLConditionArray)
    // 필터 선택
    const onPressFilter =()=>{
        props.navigation.navigate('SearchFilterPage');
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
    const[sortState,setSortState]=useState<SortStatus>({
        statusName:'추천순',
        status:'LATEST',
        statusArr:[true,false,false]
    });
    const[sort,setSort]=useState<boolean>(false);
    const onPressTagOne=()=>{
        setSortState({
            statusName:'추천순',
            status:'LATEST',
            statusArr:[true,false,false]
        })
        setSort(!sort);
    }
    const onPressTagTwo=()=>{
        setSortState({
            statusName:'조회순',
            status:'HITS',
            statusArr:[false,true,false]
        })
        setSort(!sort);
    }
    const onPressTagThree=()=>{
        setSortState({
            statusName:'등록순',
            status:'LATEST',
            statusArr:[false,false,true]
        }) 
        setSort(!sort);
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    // list data
    let listData='';
    let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const {loading,error,data,fetchMore,refetch }=useQuery(GET_LISTS,{
        variables:{
            after:pageInfo.endCursor,
            first:10,
            search:search,
            sort:sortState.status,
            conditions:pickedIdArray(conditions),
            types:pickedIdArray(types)
        }
    })
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:sortState.status,
                conditions:pickedIdArray(conditions),
                types:pickedIdArray(types)
            })
            setRefreshing(false);
        } catch(e){
            console.log('refetch err')
        }
    }
    if(loading) return <Loading />
    if(error) return <Text>err</Text>
    if(data&&types.length===0){
        storeSLTypeNewArray(newStateArray(data.types));
    }
    if(data&&conditions.length===0){
        storeSLConditionNewArray(newStateArray(data.conditions));
    }
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
    pageInfo=data.contests.pageInfo;
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
                        conditions:pickedIdArray(conditions),
                        types:pickedIdArray(types)
                    }
                })
            }
    }
    return(
        <Container>
            {map?(
                <View>
                    <SearchBarSmall navigation={props.navigation}/>
                    <SearchListBar 
                        isMap={true}
                        search={search} 
                        count={data.contests.edges.length} 
                        onPressFilter={onPressFilter}
                        onPressSort={()=>setSort(!sort)}
                        onPressMap={()=>setMap(!map)}
                        sortState={sortState.statusName}
                        badgeNumber={pickedIdArray(conditions).length+pickedIdArray(types).length}
                        />
                    <View style={{height:'80%', width:'100%', padding:5}}>
                        <Map 
                            search={search}
                            categoryState={null}
                            conditions={pickedIdArray(conditions)}
                            types={pickedIdArray(types)}
                            />
                    </View>
                </View>
            ):(
                <ScrollView 
                    ref={scrollRef}
                    onScroll={(e)=>{
                        if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height){
                            onEndReached()
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
                        isMap={false} 
                        search={search} 
                        count={data.contests.edges.length} 
                        onPressFilter={onPressFilter}
                        onPressSort={()=>setSort(!sort)}
                        onPressMap={()=>setMap(!map)}
                        sortState={sortState.statusName}
                        badgeNumber={pickedIdArray(conditions).length+pickedIdArray(types).length}
                        />
                    <View style={{padding:5}}>
                        {listData}
                    </View>
                    {pageInfo.hasNextPage?<Loading />:<LastData />}
                </ScrollView>
            )}
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
    isMap:boolean;
    search:string|undefined;
    count:number;
    onPressFilter:()=>void;
    onPressSort:()=>void;
    onPressMap:()=>void;
    sortState:string;
    badgeNumber:number;
}
const SearchListBar=({isMap,search,count,onPressFilter,onPressSort,onPressMap,sortState,badgeNumber}:SearchListBarProps)=>{
    
    return(
        <BarBox>
            <View style={{flexDirection:'row'}}>
                <BarBoxText>' {search} ' 검색결과 </BarBoxText>
                <BarBoxCount> {count}</BarBoxCount>
            </View>
            <View style={{flexDirection:'row'}}>
                {isMap?null:
                <SortBtn onPressSort={onPressSort} state={sortState}/>}
                <FilterBtn onPressFilter={onPressFilter} number={badgeNumber}/>
                {isMap?
                <ListBtn onPressMap={onPressMap}/>:<MapBtn onPressMap={onPressMap}/>
                }
                
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