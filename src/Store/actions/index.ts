// 액션
export const CATEGORIES = 'CATEGORIES'
export const CLCategory='CLCategory'
export const CLType='CLType'
export const CLCondition='CLCondition'

export const categoryAction= (categories:Array<string>)=>{
    return{
        type:CATEGORIES,
        categoriesArray:categories,
    }
}

// 카테고리 리스트 페이지 선택된 카테고리 저장 
export const CLCategoryAction= (array:Array<any>)=>{
    return{
        type:CLCategory,
        CLCategoryArray:array,
    }
}
// 카테고리 리스트 페이지 선택된 카테고리 저장 
export const CLTypeAction= (array:Array<string>)=>{
    return{
        type:CLType,
        CLTypeArray:array,
    }
}
// 카테고리 리스트 페이지 선택된 카테고리 저장 
export const CLConditionAction= (array:Array<string>)=>{
    return{
        type:CLCondition,
        CLConditionArray:array,
    }
}