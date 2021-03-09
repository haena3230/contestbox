// CategoryFilterPage
import React,{useEffect, useState} from 'react';
import {Container} from '~/Styles';
// component
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import {SortDownBtn, SortUpBtn} from  '~/Components/Btn';
// data
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {CLTypeAction,CLConditionAction} from '~/Store/actions';
import {newStateArray} from '~/Components/Filter';
import { Text, TouchableOpacity } from 'react-native';
import { HashTag } from '~/Components/HashTag';
import {CategoryFilterPageProps} from '~/Types';

const CategoryFilterPage =({navigation}:CategoryFilterPageProps)=>{
    // 상태 불러오기
    let types= useSelector((state:RootState)=>state.query.CLTypeArray)
    let conditions= useSelector((state:RootState)=>state.query.CLConditionArray)
    // 상태 업데이트
    const[state,setState]=useState(false);
    const[typeArray,setTypeArray]=useState<Array<{id:string,label:string,value:boolean}>>(types);
    const[conditionArray,setConditionArray]=useState<Array<{id:string,label:string,value:boolean}>>(conditions);
    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@@');
    },[state])
    // menu state
    const [typeMenu,setTypeMenu]=useState<Boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<Boolean>(false);
    // 상태 저장하기
    const dispatch=useDispatch();
    const storeCLTypeNewArray=(Array:Array<any>)=>{
        dispatch(CLTypeAction(Array))
    }
    const storeCLConditionNewArray=(Array:Array<any>)=>{
        dispatch(CLConditionAction(Array))
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
                            {typeArray.map((data,index)=>
                                <TouchableOpacity onPress={()=>{
                                    let tmpArray=typeArray;
                                    tmpArray[index].value=!data.value;
                                    setTypeArray(tmpArray);
                                    setState(!state);
                                }} key={data.id}>
                                    <HashTag hashtag={data.label} picked={data.value}/>
                                </TouchableOpacity>
                            )}
                        </Type>
                        ):(
                            null
                        )}
                </MenuContainer>
                <TouchableOpacity onPress={()=>{
                    console.log(types)
                    console.log(conditions)
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
                                    tmpArray[index].value=!data.value;
                                    setConditionArray(tmpArray);
                                    setState(!state);
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
                    await setTypeArray(newStateArray(types));
                    await setConditionArray(newStateArray(conditions));
                    storeCLTypeNewArray(typeArray);
                    storeCLConditionNewArray(conditionArray);
                    setState(!state);
                }}
                onPressConfirm={()=>{
                    storeCLTypeNewArray(typeArray);
                    storeCLConditionNewArray(conditionArray);
                    navigation.replace('CategoryListPage');
                    navigation.navigate('CategoryListPage');
                }}
            />
        </Container>
    )
}


export default CategoryFilterPage;