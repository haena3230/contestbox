// SearchMapFilterPage
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {Styles,Color, IconSize} from '~/Styles';
// components
import {allDelete, changeValue, deleteFilter, returnPicked} from '~/Components/Filter';
import { PageHeader } from '~/Components/Header';
import {Btn, SortDownBtn,SortUpBtn} from '~/Components/Btn';
import {FilterPickedTag, HashTag} from '~/Components/HashTag';
import CheckIcon from '~/Assets/check_circle_outline_black_24dp.svg';
import CheckIconFill from '~/Assets/check_circle_black_24dp.svg';

import { ArrayProps, SearchMapPageProps } from '~/Types';
import { categoriesVar, conditionsVar, typesVar } from '~/global';
import styled from 'styled-components/native';


const SearchMapFilterPage =({navigation}:SearchMapPageProps)=>{
    const [ch,setCh] = useState<boolean>(false)
    useEffect(()=>{
        console.log('filter page')
    },[ch])
    
    const [types,setTypes] = useState<Array<ArrayProps>>(typesVar())
    const [conditions,setConditions] = useState<Array<ArrayProps>>(conditionsVar())
    const [categories, setCategories] = useState<Array<ArrayProps>>(categoriesVar())
    const [picked, setPicked] = useState<Array<ArrayProps>>([
        ...returnPicked(types),
        ...returnPicked(conditions),
        ...returnPicked(categories)
    ])

    const [typeMenu,setTypeMenu]=useState<boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<boolean>(false);
    const [categoryMenu,setCategoryMenu]=useState<boolean>(false);
    
    return(
        <View style={{backgroundColor:Color.background,flex:1}}>
            <View style={{padding:10}}>
                <PageHeader pageName={'필터'} onPressClose={()=>navigation.goBack()}/>
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{marginBottom:60}}>
                {/* picked  */}
                {picked.length==0?(
                    null
                ):(
                    <View style={{borderBottomWidth:1, borderBottomColor:Color.border}}>
                        <ScrollView
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            style={{flexWrap:'wrap',flexDirection:'row'}}>
                            {picked.map((data)=>{
                                return(
                                <TouchableOpacity key = {data.id} onPress={()=>{
                                    setTypes(deleteFilter(types,data.id))
                                    setConditions(deleteFilter(conditions,data.id))
                                    setCategories(deleteFilter(categories,data.id))
                                    setPicked([
                                        ...returnPicked(deleteFilter(types,data.id)),
                                        ...returnPicked(deleteFilter(conditions,data.id)),
                                        ...returnPicked(deleteFilter(categories,data.id))
                                    ])
                                    setCh(!ch)
                                }}>
                                    <FilterPickedTag text={data.label}/>
                                </TouchableOpacity>
                                )})}
                        </ScrollView>
                        <TouchableOpacity onPress={()=>{
                            setTypes(allDelete(types))
                            setConditions(allDelete(conditions))
                            setCategories(allDelete(categories))
                            setPicked([])
                            setCh(!ch)
                        }} style={{alignItems:'flex-end',marginRight:20, paddingVertical:10}}>
                            <AllDeleteText>모두삭제</AllDeleteText>
                        </TouchableOpacity>
                    </View> 
                )}
                
                {/* type */}
                <MenuContainer>
                    <MenuBox  onPress={()=>{
                        setTypeMenu(!typeMenu)
                        setConditionMenu(false)
                        setCategoryMenu(false)
                        }}>
                        <MenuTitle>
                            종류
                        </MenuTitle>
                        {typeMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {typeMenu?(
                        <PickedMenuBox>
                            {types.map((data)=>{return(
                                <TouchableOpacity 
                                key = {data.id}
                                onPress={()=>{
                                    setTypes(changeValue(types,data.id))
                                    setPicked([
                                        ...returnPicked(types),
                                        ...returnPicked(conditions),
                                        ...returnPicked(categories)
                                    ])
                                    setCh(!ch)
                                }}>
                                    <HashTag hashtag={data.label} picked={data.value}/>
                                </TouchableOpacity>
                            )})}
                        </PickedMenuBox>
                    ):null}
                </MenuContainer>
                {/* condition */}
                <MenuContainer>
                    <MenuBox  onPress={()=>{
                        setTypeMenu(false)
                        setConditionMenu(!conditionMenu)
                        setCategoryMenu(false)
                        }}>
                        <MenuTitle>
                            참여대상
                        </MenuTitle>
                        {conditionMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {conditionMenu?(
                        <PickedMenuBox>
                            {conditions.map((data)=>{return(
                                <TouchableOpacity 
                                key = {data.id}
                                onPress={()=>{
                                    setConditions(changeValue(conditions,data.id))
                                    setPicked([
                                        ...returnPicked(types),
                                        ...returnPicked(conditions),
                                        ...returnPicked(categories)
                                    ])
                                    setCh(!ch)
                                }}>
                                    <HashTag hashtag={data.label} picked={data.value}/>
                                </TouchableOpacity>
                            )})}
                        </PickedMenuBox>
                    ):null}
                </MenuContainer>
                {/* category */}
                <MenuContainer>
                    <MenuBox  onPress={()=>{
                        setTypeMenu(false)
                        setConditionMenu(false)
                        setCategoryMenu(!categoryMenu)}}>
                        <MenuTitle>
                            카테고리
                        </MenuTitle>
                        {categoryMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {categoryMenu?(
                        <PickedCategoryMenuBox>
                            {categories.map((data)=>{return(
                                <TouchableOpacity 
                                key = {data.id}
                                onPress={()=>{
                                    setCategories(changeValue(categories,data.id))
                                    setPicked([
                                        ...returnPicked(types),
                                        ...returnPicked(conditions),
                                        ...returnPicked(categories)
                                    ])
                                    setCh(!ch)
                                }}
                                style={{width:'50%'}}>
                                    <FilterCategoryBtn category={data.label} picked ={data.value}/>
                                </TouchableOpacity>
                            )})}
                        </PickedCategoryMenuBox>
                    ):null}
                </MenuContainer>
            </ScrollView>
            <View style={{alignItems:'center', position:'absolute',bottom:10, width:'100%'}}>
                    <Btn color={Color.p_color} onPress={()=>{
                        typesVar(types)
                        conditionsVar(conditions)
                        categoriesVar(categories)
                        navigation.replace('SearchMapPage')
                    }} text={'적용하기'} widthPercent={90}/>
            </View>
        </View>
    )
}


// bottom btn
interface FilterBottomProps{
    onPressReset:()=>void;
    onPressConfirm:()=>void;
}
export const FilterBottom=({onPressReset,onPressConfirm}:FilterBottomProps)=>{
    return(
        <BottomContainer>
            <Btn color={Color.gray} text={' 초기화 '} onPress={onPressReset} widthPercent={30}/>
            <Btn color={Color.p_color} text={'적용하기'} onPress={onPressConfirm} widthPercent={60}/>
        </BottomContainer>
    )
}

// filter category btn
interface FilterCategoryBtnProps{
    picked:boolean;
    category:string;
}
export const FilterCategoryBtn = ({picked,category}:FilterCategoryBtnProps)=>{
    return( 
        <View style={{width:'100%'}}>
            {picked?(
                <PickedCategoryMenuItem  borderColor={Color.p_color} onPress={()=>null}>
                    <CheckIconFill width={IconSize.ssicon} height={IconSize.ssicon} fill={Color.p_color} />
                    <Text style={Styles.m_m_font}>{category}</Text>
                </PickedCategoryMenuItem>
            ):(
                <PickedCategoryMenuItem borderColor={Color.place_holder} onPress={()=>null}>
                        <CheckIcon width={IconSize.ssicon} height={IconSize.ssicon} fill={Color.place_holder} />
                        <Text style={Styles.m_m_font}>{category}</Text>
                </PickedCategoryMenuItem>
            )}
            
        </View>
    )
}

// 모두삭제
const AllDeleteText =styled.Text`
    ${Styles.s_m_font};
    color:${Color.p_color};
`
// filter menu
const MenuContainer=styled.View`
    border-bottom-width:1px;
    border-color:${Color.border};
`
 const MenuBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    padding-vertical:10px;
`
const MenuTitle=styled.Text`
    ${Styles.m_m_font};
`
const PickedMenuBox = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
    padding-horizontal:20px;
    padding-bottom:20px;
`

const PickedCategoryMenuBox= styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    width:100%
`

interface PickedCategoryMenuItemProps{
    borderColor:string;
}
const PickedCategoryMenuItem= styled.View`
    border-width:0.5px;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    border-color:${(props:PickedCategoryMenuItemProps)=>props.borderColor}
    width:100%
`

// bottom
const BottomContainer=styled.View`
    width:100%;
    height:60px;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    padding:15px;
    border-top-width:1px;
    border-color:${Color.border};
    position:absolute;
    bottom:0;
`



export default SearchMapFilterPage;