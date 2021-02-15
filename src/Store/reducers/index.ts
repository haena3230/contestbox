// 리듀서
import {CATEGORIES,CLCategory,CLType,CLCondition} from '../actions'

const initState={
    categoriesArray:[],
    CLCategoryArray:[],
    CLTypeArray:[],
    CLConditionArray:[],
}
export const queryReducers = (state=initState,action: any)=>{
    switch(action.type){
        case CATEGORIES:
            return {
                ...state,
                categoriesArray:action.categoriesArray,
            }  
        case CLCategory:
            return {
                ...state,
                CLCategoryArray:action.CLCategoryArray,
            }  
        case CLType:
            return {
                ...state,
                CLTypeArray:action.CLTypeArray,
            }  
        case CLCondition:
            return {
                ...state,
                CLConditionArray:action.CLConditionArray,
            }  
        default:
            return state; 
    }
}