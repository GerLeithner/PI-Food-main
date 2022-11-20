
const initialState = {
    loading: false,
    allRecipes : [],
    recipes: [],
    recipeDetail: {},
    diets: [],
    dishTypes: [],
    error: null
}

export default function rooReducer(state = initialState, action) {
    let allRecipes = state.allRecipes;
    let filteredRecipes;
    let sortedRecipes;

    switch(action.type) {
        case "ERROR":
            return {
                ...state,
                error: action.error
            }

        case "LOADING":
            return {...state, loading: true };
    
        case "GET_RECIPES":
            return {
                ...state,
                allRecipes : action.recipes,
                recipes: action.recipes,
                loading: false,
                error: null
            };

        case "GET_RECIPES_BY_NAME":
            return {
                ...state,
                recipes: action.recipesByName,
                loading: false,
                error: null
            }

        case "GET_RECIPE_DETAIL":
            return {
                ...state,
                recipeDetail: action.recipe
            }
        
        case "FILTER_RECIPES_BY_DIET":
            filteredRecipes = allRecipes.filter(r => r.diets.includes(action.diet));
            return {
                ...state,
                recipes: filteredRecipes
            }

        case "FILTER_RECIPES_BY_STATUS":
            if(action.status === "all") filteredRecipes = allRecipes;
            else filteredRecipes = allRecipes.filter(r => r.status === action.status);
            return {
                ...state,
                recipes: filteredRecipes
            }
        
        case "SORT_BY_ALPHABETICAL_ORDER":
            sortedRecipes = action.order === "asc" ?
            allRecipes.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) :
            allRecipes.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                recipes: sortedRecipes
            }
        
        case "SORT_BY_HEALTH_SCORE":
            sortedRecipes = action.order === "decrement" ?
            allRecipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return 1;
                if(a.healthScore < b.healthScore) return -1;
                return 0;
            }) :
            allRecipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return -1;
                if(a.healthScore < b.healthScore) return 1;
                return 0;
                });
            return {
                ...state,
                recipes: sortedRecipes
            }
        
        case "CREATE_RECIPE":
            return { ...state }

        case "GET_DIETS":
            return {
                ...state,
                diets: action.diets,
                loading: false,
                error: null
            }
        
        case "GET_DISH_TYPES":
            return {
                ...state,
                dishTypes: action.dishTypes,
                loading: false,
                error: null
            }

        default:
            return {...state,};
    }
}