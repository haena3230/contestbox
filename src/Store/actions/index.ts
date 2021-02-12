// 액션
export const CATEGORIES = 'CATEGORIES'
export const FIRSTCATEGORIES='FIRSTCATEGORIES'
export const ADDCATEGORYFILTER='ADDCATEGORYFILTER'
export const DELETECATEGORYFILTER='DELETECATEGORYFILTER'

export const categoryAction= (categories:Array<string>)=>{
    return{
        type:CATEGORIES,
        categoriesArray:categories,
    }
}

export const firstCategoryAction= (categoriesArray:Array<string>)=>{
    return{
        type:FIRSTCATEGORIES,
        firstCategories:categoriesArray,
    }
}

export const addCategoryFilterAction= (filter:Object)=>{
    return{
        type:ADDCATEGORYFILTER,
        filterArray:filter,
    }
}

export const deleteCategoryFilterAction= (filter:Object)=>{
    return{
        type:DELETECATEGORYFILTER,
        filterArray:filter,
    }
}