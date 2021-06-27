// scrap list page
import React, { useState } from 'react';
import { View,ScrollView,TouchableOpacity } from 'react-native';
import { MyPageProps } from '~/Types';
// component
import { MenuHeader } from '~/Components/Header';
import { Color, Container, IconSize } from '~/Styles';
import TextList from '~/Components/TextList';
import DeleteIcon from '~/Assets/delete_black_24dp.svg'
import { ConfirmModalComponent } from '~/Components/Modal';

import moment from 'moment';
let testt = moment()
const test={
    categories:{
        id:'12345',
        label:'카테고리'
    },
    deadline:testt.format(),
    poster:null,
    recruit:'COMPLETED',
    title:'제목이빈다.',
    viewcount:3,
}


const ScrapListPage=({navigation}:MyPageProps)=>{
    const[menu,setMenu]=useState<boolean>(false)
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
                <MenuHeader pageName={'스크랩 목록'} onPressClose={()=>navigation.goBack()} onPressSubmit={()=>setMenu(!menu)}/>
                <View style={{marginVertical:10}}>
                    <Item menu={menu}/>
                </View>
            </Container>
        </ScrollView>
    )
}

interface ItemProps{
    menu:boolean
}
const Item=({menu}:ItemProps)=>{
    const[modal,setModal]=useState<boolean>(false)
    return(
        <View style={{justifyContent:"center"}}>
            <TextList 
                categories={[test.categories]}
                deadline={test.deadline}
                poster={test.poster}
                recruit={test.recruit}
                title={test.title}
                viewcount={test.viewcount}
                onPress={()=>null}
                />{menu?(
                        <TouchableOpacity 
                        style={{
                        backgroundColor:Color.b_color,
                        opacity:0.5,
                        height:'90%',
                        width:'20%',
                        position:'absolute',
                        right:0,
                        borderTopRightRadius:10,
                        borderBottomRightRadius:10,
                        alignItems:'center',
                        justifyContent:'center'}}
                        onPress={()=>{
                            setModal(true)
                        }}
                        >
                        <DeleteIcon width={IconSize.bicon} height={IconSize.bicon}  fill={Color.w_color}/>
                    </TouchableOpacity>):null}
                <ConfirmModalComponent 
                    Info={'삭제하시겠습니까?'} 
                    modalVisible={modal} 
                    onPressCancle={()=>setModal(false)} 
                    onPressConfirm={()=>null}/>
        </View>
    )
}

export default ScrapListPage