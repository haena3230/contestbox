import React,{useState} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// styles
import styled from 'styled-components/native';
import {Color,Styles,IconSize,DWidth} from '~/Styles';

// component
import {SortDownBtn} from '~/Components/Btn';

export const Filter =()=>{
    
    return(
        <View>
            <First title={'test'}/>
            <Second title={'test'}/>
        </View>
    )
}

interface FilterProps{
    title:string;
}
const First=({title}:FilterProps)=>{
    const navigation =useNavigation()
    const onPress=()=>{
        navigation.navigate('CategoryListPage',{
            category:title,
        })
    }
    return(
        <List onPress={onPress}>
            <SortDownBtn/>
            <ListTitle>{title}</ListTitle>
        </List>
    )
}
const Second =({title}:FilterProps)=>{
    const navigation =useNavigation()
    const onPress=()=>{
        navigation.navigate('CategoryListPage',{
            category:title,
        })
    }
    return(
        <SecondList onPress={onPress}>
            <ListTitle>{title}</ListTitle>
        </SecondList>
    )
}

// 체크박스
const CheckBox=()=>{
    const[picked,setPicked]=useState(false);
    const onPressCheckBox=()=>{
        setPicked(!picked);
    }
    return(
        <TouchableOpacity style={{margin:15}}  onPress={onPressCheckBox}>
            {picked?(
                <CheckBoxStyle backgroundColor={Color.p_color} />
            ):(
                <CheckBoxStyle backgroundColor={Color.w_color} />
            )}
            
        </TouchableOpacity>
    )
}

const List = styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    padding-vertical:5px;
`
const SecondList = styled.TouchableOpacity`
    flex-direction:row;
    margin-left:50px;
    padding-vertical:5px;
`
const ListTitle = styled.Text`
    ${Styles.m_font};
`

interface CheckBoxStyleProps{
    backgroundColor:string
}
const CheckBoxStyle=styled.View`
    width:12px;
    height:12px;
    background-color:${(props:CheckBoxStyleProps)=>props.backgroundColor};
    border-width:1px;
    border-color:${Color.g1_color};
`