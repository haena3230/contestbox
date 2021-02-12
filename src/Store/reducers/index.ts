// 리듀서
import {CATEGORIES,FIRSTCATEGORIES,ADDCATEGORYFILTER,DELETECATEGORYFILTER} from '../actions'

const initState={
    categoriesArray:null,
    firstCategories:null,
    filterArray:null,
}

export const queryReducers = (state=initState,action: any)=>{
    switch(action.type){
        case CATEGORIES:
            return {
                ...state,
                categoriesArray:action.categoriesArray,
            }  
        case FIRSTCATEGORIES:
            return {
                ...state,
                firstCategories:action.firstCategories,
            }  
        case ADDCATEGORYFILTER:
            return {
                ...state,
                filterArray:action.filterArray,
            }
        case DELETECATEGORYFILTER:
            return {
                ...action.filterArray,
            }    
        default:
            return state; 
    }
}
