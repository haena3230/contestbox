// 액션
export const CATEGORIES = 'CATEGORIES'
export const CLCategory='CLCategory'
export const CLType='CLType'
export const CLCondition='CLCondition'
export const Search='Search'
export const SLCategory='SLCategory'
export const SLType='SLType'
export const SLCondition='SLCondition'
export const fetchState='fetchState'

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
// 카테고리 리스트 페이지 선택된 타입 저장 
export const CLTypeAction= (array:Array<string>)=>{
    return{
        type:CLType,
        CLTypeArray:array,
    }
}
// 카테고리 리스트 페이지 선택된 지원조건 저장 
export const CLConditionAction= (array:Array<string>)=>{
    return{
        type:CLCondition,
        CLConditionArray:array,
    }
}

// 검색 페이지 검색어 저장
export const SearchAction= (text:string)=>{
    return{
        type:Search,
        SearchText:text,
    }
}

// 검색 리스트 페이지 선택된 카테고리 저장 
export const SLCategoryAction= (array:Array<any>)=>{
    return{
        type:SLCategory,
        SLCategoryArray:array,
    }
}
// 검색 리스트 페이지 선택된 타입 저장 
export const SLTypeAction= (array:Array<string>)=>{
    return{
        type:SLType,
        SLTypeArray:array,
    }
}
// 검색 리스트 페이지 선택된 지원조건 저장 
export const SLConditionAction= (array:Array<string>)=>{
    return{
        type:SLCondition,
        SLConditionArray:array,
    }
}

// fetchMore 하기 전 숫자 체크 
export const fetchStateAction=(num:number)=>{
    return{
        type:fetchState,
        fetchStateNum:num,
    }
}
