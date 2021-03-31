// CategoryFilterPage
import React,{useEffect, useState} from 'react';
import {Container} from '~/Styles';
// component
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type,newStateArray} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import {SortDownBtn, SortUpBtn} from  '~/Components/Btn';
// data
import { Text, TouchableOpacity } from 'react-native';
import { HashTag } from '~/Components/HashTag';
import {CategoryFilterPageProps} from '~/Types';

const CategoryFilterPage =(props:CategoryFilterPageProps)=>{
    const {categoryArray,typeArray,conditionArray} =props.route.params;
    const[state,setState]=useState(false);
    const[typeArrayState,setTypeArrayState]=useState<Array<{id:string,label:string,value:boolean}>>(typeArray);
    const[conditionArrayState,setConditionArrayState]=useState<Array<{id:string,label:string,value:boolean}>>(conditionArray);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // menu state
    const [typeMenu,setTypeMenu]=useState<Boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<Boolean>(false);
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
                        {typeMenu&&typeArray?(
                            <Type>
                            {typeArrayState.map((data,index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{
                                        let tmpArray=typeArrayState;
                                        tmpArray[index].value=!data.value;
                                        setTypeArrayState(tmpArray);
                                        setState(!state);
                                    }} key={data.id}>
                                        <HashTag hashtag={data.label} picked={data.value}/>
                                    </TouchableOpacity>
                                )})}
                        </Type>
                        ):(null)}
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
                            {conditionArrayState.map((data,index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{
                                        let tmpArray=conditionArrayState
                                        tmpArray[index].value=!data.value;
                                        setConditionArrayState(tmpArray);
                                        setState(!state);
                                    }} key={data.id}>
                                        <HashTag hashtag={data.label} picked={data.value}/>
                                    </TouchableOpacity>
                                )})} 
                        </Type>
                        ):(
                            null
                        )}
                </MenuContainer>
            </ScrollView>
            <FilterBottom 
                onPressReset={async ()=>{
                    await setTypeArrayState(newStateArray(typeArray));
                    await setConditionArrayState(newStateArray(conditionArray));
                    setState(!state);
                    console.log(categoryArray)
                }}
                onPressConfirm={()=>{
                    props.navigation.navigate('CategoryListPage',{
                        categoryArray:categoryArray,
                        typeArray:typeArrayState,
                        conditionArray:conditionArrayState
                    });
                }}
            />
        </Container>
    )
}


export default CategoryFilterPage;