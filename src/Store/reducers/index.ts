// 리듀서
import {CATEGORIES} from '../actions'

const initState={
    testArray:null,
}

export const queryReducers = (state=initState,action: any)=>{
    switch(action.type){
        case CATEGORIES:
            return {
                ...state,
                testArray:action.testArray,
            }    
    
        default:
            return state; 
    }
}
