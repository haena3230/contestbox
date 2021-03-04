// SearchFilterPage
import React, { useState,useEffect } from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import {Container} from '~/Styles';
// components
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type,newStateArray} from '~/Components/Filter';
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import {HashTag} from '~/Components/HashTag';
// data
import {GET_FILTER} from '~/queries';
import {useQuery} from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {SLTypeAction,SLConditionAction,SLCategoryAction} from '~/Store/actions';
import { SearchFilterPageProps } from '~/Types';

const SearchFilterPage =({navigation}:SearchFilterPageProps)=>{
    // 상태 불러오기
    let types= useSelector((state:RootState)=>state.query.SLTypeArray)
    let conditions= useSelector((state:RootState)=>state.query.SLConditionArray)
    // 상태 업데이트
    const[state,setState]=useState(false);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // 메뉴상태
    const [typeMenu,setTypeMenu]=useState(false);
    const [categoryMenu,setCategoryMenu]=useState(false);
    const [conditionMenu,setConditionMenu]=useState(false);
    // 상태 저장하기
    const dispatch=useDispatch();
    const storeSLCategoryNewArray=(Array:Array<string>)=>{
        dispatch(SLConditionAction(Array))
    }
    const storeSLTypeNewArray=(Array:Array<string>)=>{
        dispatch(SLTypeAction(Array))
    }
    const storeSLConditionNewArray=(Array:Array<string>)=>{
        dispatch(SLConditionAction(Array))
    }
    // data
    const {loading,error,data}=useQuery(GET_FILTER);
    if(loading) return <Loading />;
    if(error) return <Text>err</Text>;
    if(data&&types.length===0){
        types=newStateArray(data.types)
    }
    if(data&&conditions.length===0){
        conditions=newStateArray(data.conditions)
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
                            {types.map((data,index)=>
                                <TouchableOpacity onPress={()=>{
                                    let tmpArray=types;
                                    tmpArray[index].value=!data.value;
                                    storeSLTypeNewArray(tmpArray)
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
                {/* <FilterMenuCategory /> */}
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
                            {conditions.map((data,index)=>
                                <TouchableOpacity onPress={()=>{
                                    let tmpArray=conditions;
                                    conditions[index].value=!data.value;
                                    storeSLConditionNewArray(tmpArray)
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
                onPressConfirm={()=>navigation.navigate('SearchListPage')} 
                onPressReset={()=>{
                    storeSLTypeNewArray(newStateArray(types))
                    storeSLConditionNewArray(newStateArray(conditions))
                    setState(!state)
                }}
                />
        </Container>
        
    )
}


export default SearchFilterPage;