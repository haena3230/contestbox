// filterpage component
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Styles,Color, IconSize, DWidth } from '~/Styles';

// components
import {Btn} from  '~/Components/Btn';
import CheckIcon from '~/Assets/check_circle_outline_black_24dp.svg';
import CheckIconFill from '~/Assets/check_circle_black_24dp.svg';
// 함수

// category treeview 저장
export const CategoryView=(array:Array<{id,label,parentID}>)=>{
  let i=0;
  let categories = new Array();
  while(array[i]!==undefined){
    let tmp = new Array();
    let j=0;
    if(array[i].parentID===null){
      tmp.push(array[i]);
      while(array[j]!==undefined){
        if(array[i].id===array[j].parentID){
          tmp.push(array[j]);
        } j++;
      }
      categories.push(tmp);
    }
    i++
  }
  return categories;
}

// value 들어간 배열 생성함수
export const newStateArray=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let i;
        let state=[]
        state.push({
                id:array[0].id,
                label:array[0].label,
                value:true
            })
        for(i=1;i<array.length;i++){
            state.push({
                id:array[i].id,
                label:array[i].label,
                value:false
            })
        }
        return state;
    }
}

// 선택된 id만 포함된 배열
export const pickedIdArray=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let idArray=[];
        let result=array.filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        return(idArray);
    }
}

// 선택된 id만 포함된 배열(다차원)
export const pickedIdArraies=(array:Array<any>)=>{
    let idArray=[];
    let i=0;
    while(array[i]!=undefined){
        let result=array[i].filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        i++;
    };
    return(idArray);
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
        <View>
            {picked?(
                <PickedCategoryMenuItem  style={{borderColor:Color.p_color}} onPress={()=>null}>
                    <CheckIconFill width={IconSize.ssicon} height={IconSize.ssicon} fill={Color.p_color} />
                    <Text style={Styles.m_m_font}>{category}</Text>
                </PickedCategoryMenuItem>
            ):(
                <PickedCategoryMenuItem style={{borderColor:Color.place_holder}} onPress={()=>null}>
                        <CheckIcon width={IconSize.ssicon} height={IconSize.ssicon} fill={Color.place_holder} />
                        <Text style={Styles.m_m_font}>{category}</Text>
                </PickedCategoryMenuItem>
            )}
            
        </View>
    )
}

// 모두삭제
export const AllDeleteText =styled.Text`
    ${Styles.s_m_font};
    color:${Color.p_color};
`
// filter menu
export const MenuContainer=styled.View`
    border-bottom-width:1px;
    border-color:${Color.border};
`
export const MenuBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    padding-vertical:10px;
`
export const MenuTitle=styled.Text`
    ${Styles.m_m_font};
`
export const PickedMenuBox = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
    padding-horizontal:20px;
    padding-bottom:20px;
`

export const PickedCategoryMenuBox= styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`
let half = DWidth/2
const PickedCategoryMenuItem= styled.TouchableOpacity`
    border-width:0.5px;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    width:${half};
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

