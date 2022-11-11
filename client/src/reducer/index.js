
const initialState = {
    loading: false,
    recipes: [],
    recipesByName: [],
    recipeDetail: {},
    diets: []
}

export default function rooReducer(state = initialState, action) {
    switch(action.type) {
        case "LOADING":
            return {...state, loading: true };
    
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.recipes,
                loading: false
            };
        
        case "GET_RECIPES_BY_NAME":
            return {
                ...state,
                recipesByName: action.recipesByName,
                loading: false
            };
        
        case "GET_RECIPE_BY_ID":
            return {
                ...state,
                recipeDetail: action.recipe,
                loading: false
            };
        case "GET_DIETS":
            return {
                ...state,
                diet: action.diets,
                loading: false
            };

        default:
            return {...state,};
    }
}