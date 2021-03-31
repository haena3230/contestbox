// SearchFilterPage
import React, { useState,useEffect } from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {Container} from '~/Styles';
// components
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type,newStateArray} from '~/Components/Filter';
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';
import {HashTag} from '~/Components/HashTag';

// data
import { SearchFilterPageProps } from '~/Types';


const SearchFilterPage =(props:SearchFilterPageProps)=>{
    // 상태 불러오기
    const{search,typeArray,conditionArray}=props.route.params;
    // 상태 업데이트
    const[state,setState]=useState<boolean>(false);
    const[typeArrayState,setTypeArrayState]=useState<Array<{id:string,label:string,value:boolean}>>(typeArray);
    const[conditionArrayState,setConditionArrayState]=useState<Array<{id:string,label:string,value:boolean}>>(conditionArray);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // 메뉴상태
    const [typeMenu,setTypeMenu]=useState<boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<boolean>(false);
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
                                    setTypeArrayState(tmpArray);
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
                {/* 카테고리
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
                                            console.log(index)
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
                </TouchableOpacity> */}
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
                                    tmpArray[index].value=!data.value;
                                    setConditionArrayState(tmpArray)
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
                onPressReset={async ()=>{
                    await setTypeArrayState(newStateArray(typeArray));
                    await setConditionArrayState(newStateArray(conditionArray));
                    setState(!state);
                }}
                onPressConfirm={()=>{
                    props.navigation.navigate('SearchListPage',{
                        search:search,
                        typeArray:typeArrayState,
                        conditionArray:conditionArrayState
                    });
                }} 
                />
        </Container>
        
    )
}


export default SearchFilterPage;