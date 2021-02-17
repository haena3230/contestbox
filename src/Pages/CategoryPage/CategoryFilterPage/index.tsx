// CategoryFilterPage
import React,{useEffect, useState} from 'react';
import {Container} from '~/Styles';
import styled from 'styled-components/native';
// component
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '~/Components/Loading';
import {SortDownBtn, SortUpBtn} from  '~/Components/Btn';
// data
import { useQuery } from '@apollo/client';
import {GET_FILTER} from '~/queries';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {CLTypeAction,CLConditionAction} from '~/Store/actions';
import {newStateArray} from '~/Components/Filter';
import { TouchableOpacity } from 'react-native';
import { HashTag } from '~/Components/HashTag';
import {CategoryFilterPageProps} from '~/Types';

const CategoryFilterPage =({navigation}:CategoryFilterPageProps)=>{
    // 상태 불러오기
    let types= useSelector((state:RootState)=>state.query.CLTypeArray)
    let conditions= useSelector((state:RootState)=>state.query.CLConditionArray)
    // 상태 업데이트
    const[state,setState]=useState(false);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // menu state
    const [typeMenu,setTypeMenu]=useState<Boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<Boolean>(false);
    // 상태 저장하기
    const dispatch=useDispatch();
    const storeCLTypeNewArray=(Array:Array<string>)=>{
        dispatch(CLTypeAction(Array))
    }
    const storeCLConditionNewArray=(Array:Array<string>)=>{
        dispatch(CLConditionAction(Array))
    }
    
    // filter 종류
    const { loading, error, data } = useQuery(GET_FILTER);
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data&&types.length===0){
        types=newStateArray(data.types)
    }
    if(data&&conditions.length===0){
        conditions=newStateArray(data.conditions)
    }
    return(
        <Container>
            <FilterHeader />
            <ScrollView>
                {/* 종류 */}
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
                                    storeCLTypeNewArray(tmpArray)
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
                                    storeCLConditionNewArray(tmpArray)
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
                onPressReset={()=>{
                    storeCLTypeNewArray(newStateArray(types))
                    storeCLConditionNewArray(newStateArray(conditions))
                    setState(!state)
                }}
                onPressConfirm={()=>navigation.navigate('CategoryListPage')}
            />
        </Container>
    )
}


export default CategoryFilterPage;