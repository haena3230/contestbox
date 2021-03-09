// SearchFilterPage
import React, { useState,useEffect } from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {Container} from '~/Styles';
// components
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type,newStateArray} from '~/Components/Filter';
import {FilterCategory} from '~/Components/Filter/FilterCategory';
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import {HashTag} from '~/Components/HashTag';
import {CategoryStateArray} from '~/Components/Filter/FilterCategory';

// data
import {GET_FILTER} from '~/queries';
import {useQuery} from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {SLTypeAction,SLConditionAction,SLCategoryAction} from '~/Store/actions';
import { SearchFilterPageProps } from '~/Types';


const SearchFilterPage =({navigation}:SearchFilterPageProps)=>{
    // 상태 불러오기
    let orgCategories =useSelector((state:RootState)=>state.query.categoriesArray)
    let categories=useSelector((state:RootState)=>state.query.SLCategoryArray)
    let types= useSelector((state:RootState)=>state.query.SLTypeArray)
    let conditions= useSelector((state:RootState)=>state.query.SLConditionArray)
    // 상태 업데이트
    const[state,setState]=useState<boolean>(false);
    const[typeArray,setTypeArray]=useState<Array<{id:string,label:string,value:boolean}>>(types);
    const[conditionArray,setConditionArray]=useState<Array<{id:string,label:string,value:boolean}>>(conditions);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // 메뉴상태
    const [typeMenu,setTypeMenu]=useState<boolean>(false);
    const [categoryMenu,setCategoryMenu]=useState<boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<boolean>(false);
    // 상태 저장하기
    const dispatch=useDispatch();
    const storeSLCategoryNewArray=(Array:Array<any>)=>{
        dispatch(SLCategoryAction(Array))
    }
    const storeSLTypeNewArray=(Array:Array<any>)=>{
        dispatch(SLTypeAction(Array))
    }
    const storeSLConditionNewArray=(Array:Array<any>)=>{
        dispatch(SLConditionAction(Array))
    }
    if(categories.length===0){
        categories=CategoryStateArray(orgCategories)
    }
    return(
        <Container>
            <FilterHeader />
            <ScrollView style={{marginBottom:60}}>
                <MenuContainer>
                    <MenuBox  onPress={()=>setTypeMenu(!typeMenu)}>
                        <MenuTitle>
                            종류
                        </MenuTitle>
                        {typeMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                        {typeMenu?(
                            <Type>
                            {typeArray.map((data,index)=>
                                <TouchableOpacity onPress={()=>{
                                    let tmpArray=typeArray;
                                    tmpArray[index].value=!data.value;
                                    setTypeArray(tmpArray);
                                    setState(!state)
                                }} key={data.id}>
                                    <HashTag hashtag={data.label} picked={data.value}/>
                                </TouchableOpacity>
                            )}
                        </Type>
                        ):(
                            null
                        )}
                </MenuContainer>
                {/* 카테고리 */}
                <MenuContainer>
                    <MenuBox  onPress={()=>setCategoryMenu(!categoryMenu)}>
                        <MenuTitle>
                            카테고리
                        </MenuTitle>
                        {categoryMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {categoryMenu?(
                        <View style={{padding:15}}>
                            {categories.map((data,index)=>{
                                return(
                                    <FilterCategory 
                                        key ={data[0].id} 
                                        category={data[0].label} 
                                        isSelect={data[0].value} 
                                        secondCategories={data} 
                                        sndIdx={index}
                                        onPressFirst={()=>{
                                            let tmpArray=categories;
                                            tmpArray[index][0].value=!data[0].value;
                                            storeSLCategoryNewArray(tmpArray)
                                            setState(!state)
                                        }}
                                        onPressSecond={()=>{
                                            setState(!state);
                                            console.log('test')
                                        }}
                                    />
                                )
                            })} 
                        </View>
                    ):null}
                </MenuContainer>
                <TouchableOpacity onPress={()=>{
                    console.log(CategoryStateArray(orgCategories))
                }}>
                    <Text>test</Text>
                </TouchableOpacity>
                {/* 참여조건 */}
                <MenuContainer>
                    <MenuBox  onPress={()=>setConditionMenu(!conditionMenu)}>
                        <MenuTitle>
                            참여조건
                        </MenuTitle>
                        {conditionMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                        {conditionMenu?(
                            <Type>
                            {conditionArray.map((data,index)=>
                                <TouchableOpacity onPress={()=>{
                                    let tmpArray=conditionArray;
                                    conditions[index].value=!data.value;
                                    setConditionArray(tmpArray)
                                    setState(!state)
                                }} key={data.id}>
                                    <HashTag hashtag={data.label} picked={data.value}/>
                                </TouchableOpacity>
                            )}
                        </Type>
                        ):(
                            null
                        )}
                </MenuContainer>
            </ScrollView>
            <FilterBottom 
                onPressConfirm={()=>{
                    storeSLTypeNewArray(typeArray);
                    storeSLConditionNewArray(conditionArray);
                    navigation.replace('SearchListPage');
                    navigation.navigate('SearchListPage');
                }} 
                onPressReset={async ()=>{
                    await setTypeArray(newStateArray(types));
                    await setConditionArray(newStateArray(conditionArray));
                    storeSLTypeNewArray(typeArray);
                    storeSLConditionNewArray(conditionArray);
                    setState(!state);
                }}
                />
        </Container>
        
    )
}


export default SearchFilterPage;