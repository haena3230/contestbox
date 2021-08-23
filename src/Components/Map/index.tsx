// 지도 component
import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
// styles
import { Styles, Color } from '~/Styles';
import styled from 'styled-components/native';
// components
import {PreRecruit,Recruit,NoRecruit,CancelRecruit,ImmenentRecruit} from '~/Components/Recruit';
import { HashTag } from '~/Components/HashTag';
// map
import Geolocation from 'react-native-geolocation-service';
import MapView,{Marker} from 'react-native-maps';
import { useQuery,makeVar } from '@apollo/client';
import { GET_MAP_LISTS, GET_SEARCH_LISTS } from '~/queries';
import Loading from '../Loading';
import { ErrorPage } from '../Error';

// 위치정보 수집 권한 요청
export async function requestPermission() {
    try {
        return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,);
    } catch (e) { console.log(e); }
}
interface ILocation {
    latitude: number;
    longitude: number;
    latitudeDelta:number;
    longitudeDelta:number;
}
interface MapApiProps{
    place:{
        leftBottom:{
            lat:number,
            lng:number
        },
        rightTop:{
            lat:number,
            lng:number
        }
    }
}
type MapApi=MapApiProps[];

interface MapProps{
    categoryIdArray:Array<any>;
    conditionIdArray:Array<any>
    typeIdArray:Array<any>;
}
interface InfoProps{
    id:string;
    title:string;
    hits:number;
    status:string;
    deadline:string;
}
// 닫기버튼 추가하기
export const Map = ({categoryIdArray,conditionIdArray,typeIdArray}:MapProps) => {
    const [location, setLocation] = useState<ILocation | undefined>({
        latitude: 37.565051, longitude: 126.978567,
        latitudeDelta:0.0922, longitudeDelta:0.107
    });
    const initLocation:MapApi=[{
        place:{
            leftBottom:{
                lat:location.latitude-location.latitudeDelta,
                lng:location.longitude-location.longitudeDelta
            },
            rightTop:{
                lat:location.latitude+location.latitudeDelta,
                lng:location.longitude+location.longitudeDelta
            }
        }
    }]
    const mapVar = makeVar<MapApi>(initLocation);
    const[menu,setMenu]=useState<boolean>(false);
    const[info,setInfo]=useState<InfoProps>();
    useEffect(() => {
        requestPermission().then(result => { console.log({ result }); 
        if (result === "granted") { 
            Geolocation.getCurrentPosition(
                async position => {
                    const {latitude, longitude} = position.coords;
                    await setLocation({
                        latitude:latitude,
                        longitude:longitude,
                        latitudeDelta:location.latitudeDelta,
                        longitudeDelta:location.longitudeDelta
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
    const { loading, error, data ,fetchMore} = useQuery(GET_MAP_LISTS,{
        variables:{
            categories:categoryIdArray,
            conditions:conditionIdArray,
            types:typeIdArray,
            place:mapVar()
        }
    });
    let mapData=``;
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={()=>null}/>
    if(data&&data.contests.edges){
        mapData=data.contests.edges.map((data)=>
            <View key={data.node.id.toString()}>
                {data.node.place?(
                    <Marker
                    coordinate={{latitude: data.node.place.latLng.lat, longitude: data.node.place.latLng.lng}}
                    // onPress={()=>{
                    //     setInfo({
                    //         id:data.node.id,
                    //         title:data.node.title,
                    //         hits:data.node.hits,
                    //         status:data.node.application.status,
                    //         deadline:data.node.application.period.endAt,
                    //     })
                    //     setMenu(!menu)
                    //     setLocation({
                    //         latitude: data.node.place.latLng.lat, 
                    //         latitudeDelta:0.0922, 
                    //         longitude: data.node.place.latLng.lng,
                    //         longitudeDelta:0.107
                    //     })
                    //     console.log(menu)
                    // }}
                    />
                ):null}
            </View>
        )
    }
    return (
        <MapContainer>
            <MapView
                style={{flex:1}}
                minZoomLevel={2} 
                maxZoomLevel={15}
                showsUserLocation={true}
                region={location}
                onPress={()=>setMenu(false)}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: location.latitudeDelta,
                    longitudeDelta: location.longitudeDelta
                }}
                onRegionChangeComplete={(region)=>{
                    mapVar([{
                        place:{
                            leftBottom:{
                                lat:region.latitude-region.latitudeDelta,
                                lng:region.longitude-region.longitudeDelta
                            },
                            rightTop:{
                                lat:region.latitude+region.latitudeDelta,
                                lng:region.longitude+region.longitudeDelta
                            }
                        }
                    }])
                    console.log(region.latitude-region.latitudeDelta);
                    console.log(region.longitude-region.longitudeDelta);
                    console.log(region.latitude+region.latitudeDelta);
                    console.log(region.longitude+region.longitudeDelta);
                }}
                >
                {mapData}
            </MapView> 
            {/* {menu?
                <MapInfoMenu
                    id={info.id}
                    title={info.title}
                    hits={info.hits}
                    tags={[]}
                    status={info.status}
                    deadline={info.deadline}
                />
            :(null)} */}
        </MapContainer>
    )
}

interface MapInfoProps{
    id:string;
    title:string;
    hits:number;
    status:string;
    deadline:string;
}
export const MapInfoMenu=({id,title,hits,status,deadline}:MapInfoProps)=>{
    const navigation=useNavigation();
    const recruit=(status)=>{
        switch(status){
            case 'NOTSTARTED':
                return <PreRecruit />;
            case 'INPROGRESS':
                return <Recruit />;
            case 'COMPLETED':
                return <NoRecruit />;
        }
    }
    const Immenent = (deadline) =>{
        return<View />
    }
    return(
        <MenuContainer onPress={()=>navigation.navigate('DetailPage',{
                        listId:id
                    })}>
            <Title>{title}</Title>
            <StateBox>
                {recruit(status)}
                {Immenent(deadline)}
                <Hits>조회수 {hits}</Hits>
            </StateBox>
        </MenuContainer>
    )
}

interface MapViewProps{
    latitude:number;
    longitude:number;
    title:string;
    description:string;
}
export const SmallMap=({latitude,longitude,title,description}:MapViewProps)=>{
    return(
    <MapView
        style={{flex:1}}
        showsUserLocation={true}
        initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        >
        <Marker
            coordinate={{latitude: latitude, longitude: longitude}}
            title={title}
            description={description}
        />
    </MapView>
    )
}

const MapContainer = styled.View`
    margin-top:10px;
    flex:1;
    border-width:1px;
    border-radius:10px;
    border-color:${Color.border};
    overflow:hidden;
`
const MenuContainer = styled.TouchableOpacity`
    position:absolute;
    bottom:0;
    width:100%;
    z-index:2;
    background-color:${Color.w_color};
    padding:10px;
    border-top-color:${Color.border};
    border-top-width:1px;
`
const Title = styled.Text`
    ${Styles.b_b_font};
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