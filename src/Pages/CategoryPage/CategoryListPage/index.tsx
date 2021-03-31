import React,{useState,useRef, useEffect} from 'react';
import {View,ScrollView,RefreshControl, Text} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container, Color} from '~/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps, SortStatus,} from '~/Types';
// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn,SortBtn,MapBtn} from '~/Components/Btn';
import Loading, { LastData } from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import {Map} from '~/Components/Map';
import { newStateArray, pickedIdArray} from '~/Components/Filter';

interface pageInfoProps{
    endCursor:string,
    hasNextPage:boolean
}

const CategoryListPage=(props:CategoryListPageProps)=>{
    // category & type & condition 
    const {categoryArray,typeArray,conditionArray} =props.route.params;
    // state
    const [category,setCategory]=useState<Array<{id:string,label:string,value:boolean}>>(categoryArray)
    const [categoryId,setCategoryId]=useState<Array<string>>([category[0].id]);
    const pickedTypeId = pickedIdArray(typeArray);
    const pickedConditionId=pickedIdArray(conditionArray);
    // 필터페이지 버튼
    const onPressFilter=()=>{
        if(!!!typeArray){
            props.navigation.navigate('CategoryFilterPage',{
                categoryArray:category,
                typeArray:initTypeArray,
                conditionArray:initConditionArray
            })}
        else{
            props.navigation.navigate('CategoryFilterPage',{
            categoryArray:category,
            typeArray:typeArray,
            conditionArray:conditionArray
        })}
    }
    // 카테고리 선택
    const onPressCateBtn=(data,index)=>{
        let tmpArray=category;
        tmpArray[index+1].value=!data.value;
        setCategory(tmpArray)
        // 남은 하나 취소
        if(categoryId.length===1&&categoryId[0]!==categoryArray[0].id){
            setCategoryId([categoryArray[0].id]);
            console.log('남은 하나 취소입니다.')
        }
        else{
            setCategoryId(pickedIdArray(tmpArray))
            console.log('처음으로 선택하거나 또 다시 선택이거나 여러개 중 하나 취소입니다.')
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
     // 정렬 버튼
    const[sortState,setSortState]=useState<SortStatus>({
        statusName:'추천순',
        status:'LATEST',
        statusArr:[true,false,false]
    });
    const[sortStatus,setSortStatus]=useState('LATEST');
    const[sort,setSort]=useState<boolean>(false);
    const onPressSort=()=>{
        setSort(!sort);
    }
    // map
    const [map,setMap]=useState(false);
    // list data
    let listData=``;
    let initTypeArray=[];
    let initConditionArray=[];

    let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const { loading, error, data,fetchMore,refetch } = useQuery(GET_LISTS,{
        variables:{
            after:pageInfo.endCursor,
            first:10,
            sort:sortStatus,
            categories:categoryId,
            conditions:pickedConditionId,
            types:pickedTypeId
        },
        fetchPolicy:'cache-and-network'
    });
    // 정렬버튼 함수
    const onPressTagOne=async ()=>{
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
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:sortStatus,
                categories:categoryId,
                conditions:pickedConditionId,
                types:pickedTypeId
            })
            setRefreshing(false);
            console.log('test')
        } catch(e){
            console.log('refetch err')
        }
    }
    
    
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data&&data.contests.edges){
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
                        sort:sortStatus,
                        categories:categoryId,
                        conditions:pickedConditionId,
                        types:pickedTypeId
                    }
                })
            }
    }
    return(
        <Container>
            <TouchableOpacity onPress={()=>{
                console.log(category)
                console.log(categoryId)
            }}>
                <Text>
                    test
                </Text>
            </TouchableOpacity>
            {map?(
                <View>
                    <View style={{height:'17%',justifyContent:'flex-end'}}>
                        <CategoryBox>
                            <Category># {categoryArray[0].label}</Category>
                        </CategoryBox>
                        <View>
                            {categoryArray.length>1?(
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {category.slice(1).map((data,index)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>onPressCateBtn(data,index)} key={data.id}>
                                                    <HashTag hashtag={data.label} picked={data.value}/>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                ):(
                                    null
                                )}
                        </View>
                        </View>
                    <BarBox 
                        height ={'8%'} 
                        isMap={true} 
                        onPressMap={()=>setMap(!map)} 
                        onPressFilter={onPressFilter}
                        onPressSort={()=>null} 
                        sortState={null}
                        badgeNumber={pickedIdArray(category).length+pickedConditionId.length+pickedTypeId.length} />
                    <View style={{width:'100%',height:'75%', padding:5}}>
                        <Map 
                            search={null}
                            categoryState={categoryId}
                            conditions={pickedConditionId}
                            types={pickedTypeId}
                            />
                    </View>
                </View>
            ):(
                <View>
                    <ScrollView 
                        style={{padding:5}} 
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
                        <View style={{paddingTop:20}}>
                            <CategoryBox>
                                <Category># {categoryArray[0].label}</Category>
                            </CategoryBox>
                            {categoryArray.length>1?(
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {category.slice(1).map((data,index)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>onPressCateBtn(data,index)} key={data.id}>
                                                    <HashTag hashtag={data.label} picked={data.value}/>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                ):(
                                    null
                                )}
                        </View>
                        <BarBox 
                            height={30}
                            isMap={false} 
                            onPressMap={()=>setMap(!map)}
                            onPressFilter={onPressFilter}
                            onPressSort={()=>setSort(!sort)} 
                            sortState={sortState.statusName}
                            badgeNumber={pickedIdArray(category).length+pickedConditionId.length+pickedTypeId.length}
                        />
                        <View style={{marginBottom:10}}>
                            {listData}
                        </View>
                        <SortComponent 
                        onPressCancle={()=>onPressSort()} 
                        modalVisible={sort} 
                        one={sortState.statusArr[0]}
                        two={sortState.statusArr[1]}
                        three={sortState.statusArr[2]}
                        onPressTagOne={()=>onPressTagOne()}
                        onPressTagTwo={()=>onPressTagTwo()}
                        onPressTagThree={()=>onPressTagThree()}
                        />
                        {pageInfo.hasNextPage?<Loading />:<LastData />}
                    </ScrollView>
                    {totop?(
                        <ToTop onPressToTop={()=>onPressToTop()}/>
                    ):(
                        null
                    )}
                </View>
            )}
        </Container>
    )
}

// category && btn
interface HeaderBoxProps{
    isMap:boolean;
    onPressMap:()=>void;
    onPressFilter:()=>void;
    onPressSort:()=>void;
    sortState:string;
    height:string|number;
    badgeNumber:number;
}
const BarBox=({isMap,onPressMap,onPressFilter,onPressSort,sortState,height,badgeNumber}:HeaderBoxProps)=>{
    return(
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'flex-end',
            marginLeft:5,
            height:height,
            }}>
            {isMap?(<View />):(<SortBtn onPressSort={()=>onPressSort()} state={sortState}/>)}
            <View style={{flexDirection:'row'}}>
                <FilterBtn onPressFilter={()=>onPressFilter()} number={badgeNumber}/>
                {isMap?(
                    <ListBtn onPressMap={()=>onPressMap()}/>
                ):(
                    <MapBtn onPressMap={()=>onPressMap()}/>
                )}
            </View>
        </View>
    )
}

const CategoryBox=styled.View`
   align-items:center;
`

const Category=styled.Text`
    ${Styles.b_font};
    font-weight:bold;
    padding-vertical:10px;
`
export default CategoryListPage;

function fetchNumAction(fetchNumAction: any) {
    throw new Error('Function not implemented.');
}

