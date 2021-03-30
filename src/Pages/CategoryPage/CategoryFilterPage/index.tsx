// CategoryFilterPage
import React,{useEffect, useState} from 'react';
import {Container} from '~/Styles';
// component
import {FilterHeader,FilterBottom,MenuContainer,MenuBox,MenuTitle,Type, pickedIdArray} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import {SortDownBtn, SortUpBtn} from  '~/Components/Btn';
// data
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
    const storeCLNewArray=(TArray:Array<any>,CArray:Array<any>)=>{
        dispatch(CLTypeAction(TArray))
        dispatch(CLConditionAction(CArray))
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
                    storeCLNewArray(typeArray,conditionArray);
                    setState(!state);
                }}
                onPressConfirm={()=>{
                    storeCLNewArray(typeArray,conditionArray);
                    navigation.replace('CategoryListPage');
                    navigation.navigate('CategoryListPage');
                }}
            />
        </Container>
    )
}


export default CategoryFilterPage;