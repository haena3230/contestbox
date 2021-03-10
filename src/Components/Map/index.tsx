// 지도 component
import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Text } from 'react-native';
// styles
import { Styles, Color } from '~/Styles';
import styled from 'styled-components/native';
// components
import { Recruit } from '~/Components/Recruit';
import { HashTag } from '~/Components/HashTag';
// map
import Geolocation from 'react-native-geolocation-service';
import MapView,{Marker} from 'react-native-maps';

// 위치정보 수집 권한 요청
export async function requestPermission() {
    try {
        return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,);
    } catch (e) { console.log(e); }
}
interface ILocation {
    latitude: number;
    longitude: number;
}

export const Map = () => {
    const [myPosiion, setMyPosition] = useState<ILocation | undefined>({latitude: 37.565051, longitude: 126.978567});
    const[menu,setMenu]=useState<boolean>(false);
    useEffect(() => {
        requestPermission().then(result => { console.log({ result }); 
        if (result === "granted") { 
            Geolocation.getCurrentPosition(
                async position => {
                    const {latitude, longitude} = position.coords;
                    await setMyPosition({
                        latitude,
                        longitude,
                    });
                },
                error => {
                    console.log(error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
        }
     });
    }, []);
    return (
        <MapContainer>
            <MapView
                style={{flex:1}}
                initialRegion={{
                    latitude: myPosiion.latitude,
                    longitude: myPosiion.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            />
             <Marker
                coordinate={{latitude: myPosiion.latitude, longitude: myPosiion.longitude}}
                title="this is a marker"
                description="this is a marker example"
                />
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
        </MapContainer>
    )
}


// const Map=()=> {
//     const defaultPosition = {latitude: 37.565051, longitude: 126.978567};
//     const [permission,setPermission]=useState(false);
//     const [myPosiion, setMyPosition] = useState<ILocation | undefined>(undefined);
//     const[menu,setMenu]=useState<boolean>(false);
//     useEffect(() => {
//         requestPermission().then(result => { console.log({ result }); 
//         if (result === "granted") { 
//             Geolocation.getCurrentPosition(
//                 async position => {
//                     const {latitude, longitude} = position.coords;
//                     await setMyPosition({
//                         latitude,
//                         longitude,
//                     });
//                     await setPermission(true);
//                 },
//                 error => {
//                     console.log(error.code, error.message);
//                 },
//                 {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//             );
//         }else   setPermission(false)
//      });
//     }, []);
//     return (
//         <View style={{width:'100%',height:'100%',padding:5}}>
//             <MapContainer>
//                 {permission?(
//                     <MapView 
//                         onCameraChange={()=>setMenu(false)}
//                         onMapClick={()=>setMenu(false)}
//                         onTipClick={()=>setMenu(!menu)}
//                         latitude={myPosiion.latitude}
//                         longitude={myPosiion.longitude}
//                     />
//                 ):(
//                     <MapView 
//                         onCameraChange={()=>setMenu(false)}
//                         onMapClick={()=>setMenu(false)}
//                         onTipClick={()=>setMenu(!menu)}
//                         latitude={defaultPosition.latitude}
//                         longitude={defaultPosition.longitude}
//                     />
//                 )}
//             </MapContainer>
//             {menu?(
//                 <MenuContainer>
//                 <Title>2020/21 한국언어학올림피아드</Title>
//                 <StateBox>
//                     <Recruit />
//                     <Hits>조회수 0</Hits>
//                 </StateBox>
//                 <CateBox>
//                     <HashTag hashtag={'fff'} picked={false}/>
//                     <HashTag hashtag={'fff'} picked={false}/>
//                 </CateBox>
//             </MenuContainer>
//             ):(null)}
//         </View>
//     )
// }

// interface MapViewProps{
//     latitude:number;
//     longitude:number;
//     onCameraChange:()=>void;
//     onMapClick:()=>void;
//     onTipClick:()=>void;
// }
// export const MapView=({latitude,longitude,onCameraChange,onMapClick,onTipClick}:MapViewProps)=>{
//     const MyPosition = {latitude: latitude, longitude: longitude};
//     return(
//     <NaverMapView style={{width: '100%', height: '100%'}}
//         showsMyLocationButton={true}
//         center={{...MyPosition, zoom: 10}}
//         onCameraChange={onCameraChange}
//         onMapClick={onMapClick}
//         >
//         <Marker coordinate={MyPosition} pinColor="blue" onClick={onTipClick} />
//     </NaverMapView>
//     )
// }

const MapContainer = styled.View`
    flex:1;
    border-width:1px;
    border-radius:10px;
    border-color:${Color.g1_color};
    overflow:hidden;
`
const MenuContainer = styled.View`
    position:absolute;
    bottom:0;
    width:100%;
    z-index:2;
    background-color:${Color.w_color};
    padding:10px;
    border-top-color:${Color.g1_color};
    border-top-width:1px;
`
const Title = styled.Text`
    ${Styles.b_font};
    font-weight:bold;
`
const Hits = styled.Text`
    ${Styles.ss_font};
`
const StateBox = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding-vertical:10px;
`
const CateBox = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`


export default Map;