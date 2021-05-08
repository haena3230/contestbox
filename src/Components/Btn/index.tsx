// button components
import React,{useCallback} from 'react';
import styled from 'styled-components/native';
import {Color,Styles,IconSize} from '~/Styles';
import {View,TouchableOpacity,Text, Linking, Alert} from 'react-native';


// icon
import FilterIcon from '~/Assets/filter-solid.svg';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import SortDown from '~/Assets/sort-down-solid.svg';
import ListIcon from '~/Assets/list-ul-solid.svg';
import SortUp from '~/Assets/sort-up-solid.svg';


interface BtnProps{
    text:string;
    onPress:()=>void;
    color:string;
    widthPercent:number;
}
export const Btn=({text,onPress,color,widthPercent}:BtnProps)=>{
    
    return(
        <BtnContainer onPress={onPress} color={color} width={widthPercent}>
            <BtnText>{text}</BtnText>
        </BtnContainer>
    )
}

// map btn
interface MapBtnProps{
    onPressMap:()=>void;
}
export const MapBtn = ({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <MapIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} />
        </IconBorder>
    )
}

// list btn
export const ListBtn=({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <ListIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} />
        </IconBorder>
    )
}

// filter btn
interface FilterBtnProps{
    onPressFilter:()=>void;
    number:number;
}
export const FilterBtn =({onPressFilter,number}:FilterBtnProps)=>{
    return(
        <IconBorder onPress={onPressFilter}>
            {number===0?(
                null
            ):(
                <Badge number={number}/>
            )}
            <FilterIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} />
        </IconBorder>   
    )
}

interface BadgeProps{
    number:number
}
const Badge=({number}:BadgeProps)=>{
    return(
        <BadgeStyle>
            <Text style={{color:Color.w_color,fontSize:10}}>
                {number}
            </Text>
        </BadgeStyle>
    )
}

// sort btn
interface SortBtnProps{
    onPressSort:()=>void;
    state:string;
}
export const SortBtn=({onPressSort,state}:SortBtnProps)=>{
    return(
        <TouchableOpacity onPress={onPressSort} style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={Styles.s_m_font}>{state}</Text>
            <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.gray}/>
            </View>
        </TouchableOpacity>
    )
}


export const SortDownBtn=()=>{
    return(
        <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.gray}/>
        </View>
    )
}

export const SortUpBtn=()=>{
    return(
        <View style={{padding:5,marginTop:3}}>
            <SortUp width={IconSize.sicon} height={IconSize.sicon} color={Color.gray}/>
        </View>
    )
}

// link
export const OpenURLBtn = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
        await Linking.openURL(url);
        } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
    
return <Btn text={children} onPress={handlePress} color={Color.p_color} widthPercent={40}/>;
};

// short
interface BtnContainerProps{
    color:string;
    width:number;
}
const BtnContainer=styled.TouchableOpacity`
    width:${(props:BtnContainerProps)=>props.width}%;
    background-color:${(props:BtnContainerProps)=>props.color};
    border-radius:10px;
    align-items:center;
`
const BtnText=styled.Text`
    ${Styles.m_b_font};
    color:${Color.w_color};
    justify-content:center;
    padding:10px;
`

const IconBorder=styled.TouchableOpacity`
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:7px;
    margin:2px;
`

// badge
const BadgeStyle=styled.View`
    border-radius:10px;
    width:15px;
    height:15px;
    background-color:${Color.p_color};
    align-items:center;
    justify-content:center;
    position:absolute;
    right:-5px;
    top:-5px;
    z-index:3;
`