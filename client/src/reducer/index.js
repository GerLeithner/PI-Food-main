
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

        case "GET_DIETS":
            return {
                ...state,
                diets: action.diets,
                loading: false
            };

        default:
            return {...state,};
    }
}