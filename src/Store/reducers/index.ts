// 리듀서
import {CATEGORIES,CLCategory,CLType,CLCondition,Search,SLCategory,SLType,SLCondition} from '../actions'

const initState={
    categoriesArray:[],
    CLCategoryArray:[],
    CLTypeArray:[],
    CLConditionArray:[],
    SearchText:'',
    SLCategoryArray:[],
    SLTypeArray:[],
    SLConditionArray:[],
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
        case Search:
            return {
                ...state,
                SearchText:action.SearchText,
            }  
        case SLCategory:
            return {
                ...state,
                SLCategoryArray:action.SLCategoryArray,
            }  
        case SLType:
            return {
                ...state,
                SLTypeArray:action.SLTypeArray,
            }  
        case SLCondition:
            return {
                ...state,
                SLConditionArray:action.SLConditionArray,
            }  
        default:
            return state; 
    }
}