import React,{useState,useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container} from '~/Styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps} from '~/Types';
import {useSelector} from 'react-redux';
import {RootState} from '~/App';
// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn,SortBtn,MapBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Map from '~/Components/Map';
import {pickedIdArray} from '~/Components/Filter';

const CategoryListPage=(props:CategoryListPageProps)=>{
    // 마운트를 위한 상태
    const [state,setState]=useState(false);
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
    const[sortState,setSortState]=useState<string>('추천순');
    const[sort,setSort]=useState<boolean>(false);
    const[one,setOne]=useState<boolean>(true);
    const[two,setTwo]=useState<boolean>(false);
    const[three,setThree]=useState<boolean>(false);
    const onPressTagOne=()=>{
        setOne(true);
        setTwo(false);
        setThree(false);
        setSortStatus('LATEST');
        setSort(!sort);
        setSortState('추천순');
    }
    const onPressTagTwo=()=>{
        setOne(false)
        setTwo(true)
        setThree(false)
        setSortStatus('HITS');
        setSort(!sort);
        setSortState('조회순');
    }
    const onPressTagThree=()=>{
        setOne(false)
        setTwo(false)
        setThree(true)
        setSortStatus('LATEST');
        setSort(!sort);
        setSortState('등록순');
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    //map
    const [map,setMap]=useState(false);

    // list data
    const [sortStatus,setSortStatus]=useState<string>('LATEST')
    
    const { loading, error, data } = useQuery(GET_LISTS,{
        variables:{
            sort:sortStatus,
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
                    <View style={{width:'100%',height:'75%'}}>
                        <Map />
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
                            sortState={sortState}
                            badgeNumber={pickedIdArray(category).length+pickedIdArray(conditions).length+pickedIdArray(types).length}
                        />
                        <View style={{marginBottom:10}}>
                            {listData}
                        </View>
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
`
export default CategoryListPage;