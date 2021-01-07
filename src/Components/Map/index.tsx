// 지도 component
import React,{useState,useEffect} from 'react';
import {View} from 'react-native';
// styles
import {Styles,Color}from '~/Styles';
import styled from 'styled-components/native';
// components
import {Recruit} from '~/Components/Recruit';
import {HashTag} from '~/Components/HashTag';
// map
import NaverMapView, {Marker} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

interface ILocation {
  latitude: number;
  longitude: number;
}

const Map=()=> {
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const [location, setLocation] = useState<ILocation | undefined>(undefined);
    const[menu,setMenu]=useState<boolean>(false);
    useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
    return (
        <View>
            <View style={{margin:5,borderWidth:1,borderRadius:10,borderColor:Color.g1_color,overflow:'hidden'}}>
                <NaverMapView style={{width: '100%', height: '100%'}}
                                    showsMyLocationButton={true}
                                    center={{...P1, zoom: 10}}
                                    onCameraChange={() => setMenu(false)}
                                    onMapClick={() => setMenu(false)}
                                    >
                    <Marker coordinate={P1} pinColor="blue" onClick={() => setMenu(true)}/>
                </NaverMapView>
            </View>
            {menu?(
                <MenuContainer>
                <Title>2020/21 한국언어학올림피아드</Title>
                <StateBox>
                    <Recruit />
                    <Hits>조회수 0</Hits>
                </StateBox>
                <CateBox>
                    <HashTag hashtag={'fff'} picked={false}/>
                    <HashTag hashtag={'fff'} picked={false}/>
                </CateBox>
            </MenuContainer>
            ):(null)}
        </View>
    )
}

interface SndMapProps{
    latitude:number;
    longitude:number;
}
export const SndMap=({latitude,longitude}:SndMapProps)=>{
    const P1 = {latitude: latitude, longitude: longitude};
    return(
    <NaverMapView style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{...P1, zoom: 10}}
        >
        <Marker coordinate={P1} pinColor="blue" />
    </NaverMapView>
    )
}

const MenuContainer=styled.View`
    position:absolute;
    bottom:0;
    width:100%;
    z-index:2;
    background-color:${Color.w_color};
    padding:10px;
    border-top-color:${Color.g1_color};
    border-top-width:1px;
`
const Title=styled.Text`
    ${Styles.b_font};
    font-weight:bold;
`
const Hits=styled.Text`
    ${Styles.ss_font};
`
const StateBox=styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding-vertical:10px;
`
const CateBox=styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`


export default Map;