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

export const LongBtn =()=>{
    return(
        <Container>
            <LText>필터 적용하기</LText>
        </Container>
    )
}

interface ShortBtnProps{
    text:string;
    onPress:()=>void;
    color:string;
}
export const ShortBtn=({text,onPress,color}:ShortBtnProps)=>{
    
    return(
        <SContainer onPress={onPress} color={color}>
            <SText>{text}</SText>
        </SContainer>
    )
}

// map btn
interface MapBtnProps{
    onPressMap:()=>void;
}
export const MapBtn = ({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <MapIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
        </IconBorder>
    )
}

// list btn
export const ListBtn=({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <ListIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
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
            <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
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
            <Text style={Styles.s_font}>{state}</Text>
            <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
            </View>
        </TouchableOpacity>
    )
}


export const SortDownBtn=()=>{
    return(
        <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
        </View>
    )
}

export const SortUpBtn=()=>{
    return(
        <View style={{padding:5,marginTop:3}}>
            <SortUp width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
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
    
return <ShortBtn text={children} onPress={handlePress} color={Color.p_color}/>;
};


// long
const Container=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${Color.p_color};
    border-radius:15px;

`
const LText=styled.Text`
    ${Styles.m_font};
    color:${Color.w_color};
    padding:8px;
`

// short
interface SContainerProps{
    color:string;
}
const SContainer=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${(props:SContainerProps)=>props.color};
    border-radius:10px;
    padding-horizontal:15px;
`
const SText=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    color:${Color.w_color};
    padding:8px;
`

const IconBorder=styled.TouchableOpacity`
    border-width:1px;
    border-color:${Color.g1_color};
    border-radius:5px;
    padding:5px;
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