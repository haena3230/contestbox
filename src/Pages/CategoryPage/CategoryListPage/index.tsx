import React,{useState,useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container} from '~/Styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps} from '~/Types';
// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn,SortBtn,MapBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Map from '~/Components/Map';

const CategoryListPage=(props:CategoryListPageProps)=>{
    // 선택 개수 세는 함수
    const countCategory=(array:Array<any>)=>{
        let result=array.filter(d=>{
            return d.value===true
        })
        let idArray=[];
        result.forEach((e)=>{
            idArray.push(e.id)
        })
        console.log(idArray)
        return(idArray);
    }
    // 카테고리
    const {categories}=props.route.params;
    let i=0;
    let categoryState=[]
    for(i=0;i<categories.length;i++){
        categoryState.push({
            id:categories[i].id,
            label:categories[i].label,
            value:false
        })
    }
    const [state,setState]=useState(false)
    const [category,setCategory]=useState<Array<{id:string,label:string,value:boolean}>>(categoryState)
    
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@')
    },[state])
    // totop
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
        variables:{categories:countCategory(category).concat(categories[0].id),sort:sortStatus}
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
    }
    return(
        <Container>
            {map?(
                <View>
                    <View style={{height:'15%'}}>
                        <CategoryBox>
                            <Category># {categories[0].label}</Category>
                        </CategoryBox>
                    </View>
                    <BarBox 
                        height ={'10%'} 
                        isMap={true} 
                        onPressMap={()=>setMap(!map)} 
                        onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                        onPressSort={()=>null} 
                        sortState={null}
                        badgeNumber={countCategory(category).length} />
                    <View style={{width:'100%',height:'75%'}}>
                        <Map />
                    </View>
                </View>
            ):(
                <View>
                    <ScrollView style={{padding:5}} ref={scrollRef}>
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
                        <BarBox 
                            height={30}
                            isMap={false} 
                            onPressMap={()=>setMap(!map)}
                            onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                            onPressSort={()=>setSort(!sort)} 
                            sortState={sortState}
                            badgeNumber={countCategory(category).length}
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
                    <ToTop onPressToTop={onPressToTop}/>
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
   justify-content:center;
   align-items:center;
   padding-vertical:30px;
`

const Category=styled.Text`
    ${Styles.b_font};
    font-weight:bold;
`
export default CategoryListPage;