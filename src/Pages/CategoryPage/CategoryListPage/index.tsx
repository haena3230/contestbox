import React,{useState,useRef, useEffect} from 'react';
import {FlatList, View,Text} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container} from '~/Styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps} from '~/Types';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import { CLConditionAction, CLTypeAction } from '~/Store/actions';
import {SortStatus} from '~/Types';
// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn,SortBtn,MapBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import {Map} from '~/Components/Map';
import {newStateArray, pickedIdArray} from '~/Components/Filter';

const CategoryListPage=(props:CategoryListPageProps)=>{
    // 마운트를 위한 상태
    const [state,setState]=useState(false);
    // 저장
    const dispatch=useDispatch();
    const storeCLTypeNewArray=(Array:Array<any>)=>{
        dispatch(CLTypeAction(Array))
    }
    const storeCLConditionNewArray=(Array:Array<any>)=>{
        dispatch(CLConditionAction(Array))
    }
    // category & type & condition
    const categories =useSelector((state:RootState)=>state.query.CLCategoryArray)
    const types= useSelector((state:RootState)=>state.query.CLTypeArray)
    const conditions= useSelector((state:RootState)=>state.query.CLConditionArray)
    // state
    const [category,setCategory]=useState<Array<{id:string,label:string,value:boolean}>>(categories)
    // category 선택시 빼주기 위한 변수
    let categoryState=[categories[0].id];
    if(pickedIdArray(category)===[]){
        categoryState=[categories[0].id];
    }
    else{
        categoryState=pickedIdArray(category);
    }
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@')
    },[state])
    // totop
    let totop=false;
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
    //map
    const [map,setMap]=useState(false);
    const { loading, error, data } = useQuery(GET_LISTS,{
        variables:{
            sort:sortState.status,
            categories:categoryState,
            conditions:pickedIdArray(conditions),
            types:pickedIdArray(types)
        }
    });
    let listData=``;
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data&&types.length===0){
        storeCLTypeNewArray(newStateArray(data.types));
    }
    if(data&&conditions.length===0){
        storeCLConditionNewArray(newStateArray(data.conditions));
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
        if(listData.length>3) totop=true;
        else totop=false;
    }
    return(
        <Container>
            {map?(
                <View>
                    <View style={{height:'17%',justifyContent:'flex-end'}}>
                        <CategoryBox>
                            <Category># {categories[0].label}</Category>
                        </CategoryBox>
                        <View>
                            {category.length===categories.length?(
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {category.slice(1).map((data,index)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>{
                                                    let tmpArray=category;
                                                    tmpArray[index+1].value=!data.value;
                                                    setCategory(tmpArray)
                                                    setState(!state)
                                                }} key={data.id}>
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
                        onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                        onPressSort={()=>null} 
                        sortState={null}
                        badgeNumber={pickedIdArray(category).length+pickedIdArray(conditions).length+pickedIdArray(types).length} />
                    <View style={{width:'100%',height:'75%', padding:5}}>
                        <Map 
                            search={null}
                            categoryState={categoryState}
                            conditions={pickedIdArray(conditions)}
                            types={pickedIdArray(types)}
                            />
                    </View>
                </View>
            ):(
                <View>
                    <ScrollView style={{padding:5}} ref={scrollRef}>
                        <View style={{paddingTop:20}}>
                            <CategoryBox>
                                <Category># {categories[0].label}</Category>
                            </CategoryBox>
                            {category.length===categories.length?(
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {category.slice(1).map((data,index)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>{
                                                    let tmpArray=category;
                                                    tmpArray[index+1].value=!data.value;
                                                    setCategory(tmpArray)
                                                    setState(!state)
                                                }} key={data.id}>
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
                            onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                            onPressSort={()=>setSort(!sort)} 
                            sortState={sortState.statusName}
                            badgeNumber={pickedIdArray(category).length+pickedIdArray(conditions).length+pickedIdArray(types).length}
                        />
                        <View style={{marginBottom:10}}>
                            {listData}
                        </View>
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
                    </ScrollView>
                    {totop?(
                        <ToTop onPressToTop={onPressToTop}/>
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
            {isMap?(<View />):(<SortBtn onPressSort={onPressSort} state={sortState}/>)}
            <View style={{flexDirection:'row'}}>
                <FilterBtn onPressFilter={onPressFilter} number={badgeNumber}/>
                {isMap?(
                    <ListBtn onPressMap={onPressMap}/>
                ):(
                    <MapBtn onPressMap={onPressMap}/>
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