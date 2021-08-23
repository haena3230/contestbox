// map을 사용해서 검색
import React, { useEffect } from 'react'
import {View} from 'react-native'
import { pickedIdArray } from '~/Components/Filter'
import { FilterHeader } from '~/Components/Header'
import { categoriesVar, conditionsVar, typesVar } from '~/global'
import { Container } from '~/Styles'
import { SearchMapPageProps} from '~/Types'
import Map from '~/Components/Map'

const SearchMapPage = ({navigation}:SearchMapPageProps) =>{
    const typesIdArray = pickedIdArray(typesVar())
    const conditionIdArray = pickedIdArray(conditionsVar())
    const categoryIdArray = pickedIdArray(categoriesVar())
    
    useEffect(()=>{
        console.log(typesIdArray,conditionIdArray,categoryIdArray)
    },[])
    return(
        <Container>
            <FilterHeader pageName={'지도로 찾기'} onPressClose={()=>navigation.goBack()} 
                filterNum={typesIdArray.length + conditionIdArray.length + categoryIdArray.length} onPressFilter={()=>{
                navigation.navigate('SearchMapFilterPage')
            }}/>
            <Map categoryIdArray={categoryIdArray} conditionIdArray={conditionIdArray} typeIdArray={typesIdArray} />

        </Container>
    )
}

export default SearchMapPage
