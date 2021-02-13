// 리듀서
import {CATEGORIES} from '../actions'

const initState={
    categoriesArray:null,
}
export const queryReducers = (state=initState,action: any)=>{
    switch(action.type){
        case CATEGORIES:
            return {
                ...state,
                categoriesArray:action.categoriesArray,
            }  
        default:
            return state; 
    }
}