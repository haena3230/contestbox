// 액션
export const CATEGORIES = 'CATEGORIES'
export const FIRSTCATEGORIES='FIRSTCATEGORIES'

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